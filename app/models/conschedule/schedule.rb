module Conschedule
  class Schedule < ApplicationRecord

    validates :app_time_zone, :user_time_zone, :app_tz_offset, :user_tz_offset, :slot_start_time, :slot_end_time, :first_name, :phone, :email, presence: true

    scope :past, -> (status,time) { where("status IN (?) AND slot_start_time < ?",status,time) }
    scope :upcoming, -> (status,time) { where("status IN (?) AND slot_start_time >= ?",status,time) } 
    scope :range, -> (status,start_time,end_time) { where("status IN (?) AND (slot_start_time >= ? AND slot_start_time <= ?)",status,start_time,end_time) }  

    after_create :send_confirmation_email
    after_update :send_cancel_email

    def full_name
      [first_name,last_name].compact.join(" ")
    end	

    def send_confirmation_email
      SchedulesMailer.send_confirmation_email_user(self).deliver
      if Conschedule.send_confirmation_mail && validate_to_address
        SchedulesMailer.send_confirmation_email_owner(self).deliver    
      end  
    end

    def send_cancel_email
      if status_changed?
        SchedulesMailer.send_cancel_email_user(self).deliver
      end
      if Conschedule.send_cancel_mail && validate_to_address
        SchedulesMailer.send_cancel_email_owner(self).deliver  
      end	
    end	

    def status_changed?
      changed_attributes.has_key?("status") && changed_attributes["status"] == "active"	
    end	

    def validate_to_address
      return false if Conschedule.to_address.downcase =~ /please-change-me/
      return true
    end	

    def cancelled?
      status == "cancelled"  
    end  

    def display_action?
      if status == "cancelled"
        return false 
      else
        slot_start_time = self.slot_date_time("app","start")
        current_time = Time.now.in_time_zone(app_time_zone)
        return current_time > slot_start_time ? false : true
      end  
    end  

    def slot_date_time(version,period)
      tz = version == "app" ? app_time_zone : user_time_zone
      period == "start" ? slot_start_time.in_time_zone(tz) : slot_end_time.in_time_zone(tz)
    end


  end
end
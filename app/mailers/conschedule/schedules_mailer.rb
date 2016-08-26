module Conschedule
  class SchedulesMailer < ActionMailer::Base
    default from: Conschedule.from_address
    layout 'conschedule/mailer'

    def send_cancel_email_user(schedule)
      @schedule = schedule
      @slot_date = schedule.slot_date_time("user","start").strftime("%B %-d, %Y")
      mail(
        to: "#{schedule.full_name} <#{schedule.email}>", 
        subject: "Canceled: #{schedule.event_name} with #{Conschedule.contact_name} on #{@slot_date}"	
      )  
    end
   
    def send_cancel_email_owner(schedule)
      @schedule = schedule
      @slot_date = schedule.slot_date_time("app","start").strftime("%B %-d, %Y")
      @slot_start_time = schedule.slot_date_time("app","start")
      mail(
        to: Conschedule.to_address, 
        subject: "Canceled: #{schedule.event_name} with #{schedule.full_name} on #{@slot_date}" 
      )  
    end
   
    def send_confirmation_email_owner(schedule)
      @schedule = schedule
      @slot_date = schedule.slot_date_time("app","start").strftime("%B %-d, %Y")
      @slot_start_time = schedule.slot_date_time("app","start")
      mail(
        to: Conschedule.to_address, 
        subject: "New Event: #{schedule.event_name} with #{schedule.full_name} on #{@slot_date}" 
      )  
    end
    
    def send_confirmation_email_user(schedule)
      @schedule = schedule
      @slot_date = schedule.slot_date_time("user","start").strftime("%B %-d, %Y")
      mail(
        to: "#{schedule.full_name} <#{schedule.email}>", 
        subject: "Confirmed: #{schedule.event_name} with #{Conschedule.contact_name} on #{@slot_date}" 
      )  
    end 
  

  end
end
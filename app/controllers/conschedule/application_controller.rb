module Conschedule
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    def validate_config
      ["main_heading", "purpose", "instructions", "location_details", "start_date", "end_date", "available_days", "system_time_zone", "black_out_dates", "sun_timings", 
       "mon_timings", "tue_timings", "wed_timings", "thu_timings", "fri_timings", "sat_timings", "duration", "from_address", "send_confirmation_mail", "send_cancel_mail", 
       "to_address", "contact_name"].each do |name|
        case name
          when "main_heading", "purpose", "instructions", "location_details"
            fail "Invalid value for #{name.to_s.titleize}, value should be a String" if !Conschedule.send(name).blank? && !Conschedule.send(name).is_a?(String)
          when "start_date"
            fail "Invalid value for #{name.to_s.titleize}, value should be a valid Date" unless Date.valid_date? *Conschedule.send(name).split('-').map(&:to_i)
          when "end_date"
            fail "Invalid value for #{name.to_s.titleize}, value should be a valid Date" unless Date.valid_date? *Conschedule.send(name).split('-').map(&:to_i)
            fail "Invalid value for #{name.to_s.titleize}, value should be greater than start date" if Conschedule.end_date.to_date < Conschedule.start_date.to_date
          when "available_days"
            fail "Invalid value for #{name.to_s.titleize}, value should be a valid Array" if !Conschedule.send(name).is_a?(Array)
            valid_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            invalid_values = Conschedule.send(name) - valid_days
            fail "Invalid value for #{name.to_s.titleize}, valid values are #{valid_days.join(', ')}" unless invalid_values.empty?
          when "system_time_zone"
            fail "Invalid value for #{name.to_s.titleize}, value should be a valid TimeZone" unless ActiveSupport::TimeZone[Conschedule.send(name)].present?
          when "black_out_dates"
          	unless Conschedule.send(name).blank?
	          fail "Invalid value for #{name.to_s.titleize}, value should be a valid Array" if !Conschedule.send(name).is_a?(Array)
              Conschedule.send(name).each do |date|
                fail "Invalid value for #{name.to_s.titleize}, value should be a valid Date" unless Date.valid_date? *date.split('-').map(&:to_i)
              end
            end  
          when "sun_timings", "mon_timings", "tue_timings", "wed_timings", "thu_timings", "fri_timings", "sat_timings"
            fail "Invalid value for #{name.to_s.titleize}, value should be a valid Array" if !Conschedule.send(name).is_a?(Array)
            start_time, end_time = Conschedule.send(name)
            fail "Invalid value for #{name.to_s.titleize}, value should have a valid start time" if /^(2[0-3]|[01][0-9]):([0-5][0-9])$/.match(start_time).blank?
            fail "Invalid value for #{name.to_s.titleize}, value should have a valid end time" if /^(2[0-3]|[01][0-9]):([0-5][0-9])$/.match(end_time).blank?
            fail "Invalid value for #{name.to_s.titleize}, value should have a valid start time and end time" if end_time.to_time < start_time.to_time
          when "duration"
            fail "Invalid value for #{name.to_s.titleize}, value should be a valid Integer" if !Conschedule.send(name).is_a?(Integer)
            fail "Invalid value for #{name.to_s.titleize}, value should be a greater than or equal to 5 and less than or equal to 1440" unless Conschedule.send(name) >= 5 && Conschedule.send(name) <= 1440
          when "send_confirmation_mail", "send_cancel_mail"
            fail "Invalid value for #{name.to_s.titleize}, value should be a valid Boolean true or false" unless Conschedule.send(name).is_a?(TrueClass) || Conschedule.send(name).is_a?(FalseClass)
          when "contact_name"
            fail "Invalid value for #{name.to_s.titleize}, value should be a string" if !Conschedule.send(name).is_a?(String)    
        end 	
      end
    end	

  end
end
require "conschedule/engine"
require "conschedule/configuration"
require "conschedule/gem_dependencies"

module Conschedule

  extend Configuration

  # default configuration
  define_setting :main_heading, "Contact"
  define_setting :purpose, 'An introduction to our product'
  define_setting :instructions, 'Learn about our product'
  define_setting :location_details, 'Details will be provided on confirmation'
  define_setting :system_time_zone, "Asia/Kolkata"
  define_setting :start_date, Time.now.in_time_zone(Conschedule.system_time_zone).beginning_of_year.strftime("%Y-%m-%d")
  define_setting :end_date, Time.now.in_time_zone(Conschedule.system_time_zone).end_of_year.strftime("%Y-%m-%d")
  define_setting :available_days, ["Mon", "Tue", "Wed", "Thu", "Fri"] 
  define_setting :black_out_dates
  define_setting :sun_timings, ["09:00", "22:00"]
  define_setting :mon_timings, ["09:00", "22:00"]
  define_setting :tue_timings, ["09:00", "22:00"]
  define_setting :wed_timings, ["09:00", "22:00"]
  define_setting :thu_timings, ["09:00", "22:00"]
  define_setting :fri_timings, ["09:00", "22:00"]
  define_setting :sat_timings, ["09:00", "22:00"]
  define_setting :duration, 30
  define_setting :from_address, "PLEASE-CHANGE-ME@example.com"
  define_setting :send_confirmation_mail, false
  define_setting :send_cancel_mail, false
  define_setting :to_address, "PLEASE-CHANGE-ME@example.com"
  define_setting :contact_name, "PLEASE-CHANGE-ME"
  define_setting :enable_tz, true

end
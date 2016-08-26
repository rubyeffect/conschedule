module Conschedule
  module SchedulesHelper

    def cancel_reason(schedule)
      if schedule.cancel_reason.blank?
        'No reason provided.'
      else
        schedule.cancel_reason
      end
    end	

    def slot_start_end_time(schedule,version,start_time=false)
      slot_start_time = schedule.slot_start_time
      slot_end_time = schedule.slot_end_time
      tz = version == "app" ? schedule.app_time_zone : schedule.user_time_zone
      sst = slot_start_time.in_time_zone(tz)
      set = slot_end_time.in_time_zone(tz)
      if start_time
        [fdtime(sst,:time),fdtime(sst,:date)].join(" - ")
      else
        [fdtime(sst,:time),fdtime(set,:time)].join(" - ")
      end  
    end 

    def is_today?(date,tz)
      Time.now.in_time_zone(tz).strftime("%Y-%m-%d") == date.in_time_zone(tz).strftime("%Y-%m-%d")
    end  

    def page_entries_info(collection, options = {})
      entry_name = options[:entry_name] || collection.entry_name
      entry_name = entry_name.pluralize unless collection.total_count == 1

      if collection.total_pages < 2
        "Displaying #{collection.total_count} of #{collection.total_count} #{entry_name}"
      else
        first = collection.offset_value + 1
        last = (sum = collection.offset_value + collection.limit_value) > collection.total_count ? collection.total_count : sum
        "Displaying #{first} – #{last} of #{collection.total_count} #{entry_name} "
      end.html_safe  
    end  

  end
end
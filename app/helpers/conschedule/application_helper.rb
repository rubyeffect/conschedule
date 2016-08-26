module Conschedule
  module ApplicationHelper

    def fdtime(date_time,format)
      formats = {
        time: "%I:%M%P",
        date: "%A, %B %-d, %Y",
        month_date: "%B %-d, %Y"
      }
      date_time.strftime(formats[format])
    end	


  end
end

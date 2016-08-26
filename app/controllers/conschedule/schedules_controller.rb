require_dependency "conschedule/application_controller"

module Conschedule
  class SchedulesController < ApplicationController

  	before_action :validate_config

    def index
    	config_data
      @filters_applied = params[:status_ids].present? && params[:status_ids].include?("cancelled") ? true : false
      @schedules = schedules_search.page(params[:page])  
      @grouped = @schedules.group_by { |s| s.slot_start_time.strftime("%Y-%m-%d") }
      render layout: "conschedule/application"
    end

    def new
      config_data
      @schedule = Schedule.new
      render layout: "conschedule/schedules"
    end

    def create
    	config_data
      sst = convert_to_tz(params[:schedule][:slot_start_time],params[:schedule][:user_time_zone])
    	set = convert_to_tz(params[:schedule][:slot_end_time],params[:schedule][:user_time_zone])
    	schedule_data = {
    		app_time_zone: @page_info[:system_time_zone], 
    		event_name: @page_info[:purpose], 
    		event_description: @page_info[:instructions], 
    		location_details: @page_info[:location_details], 
    		contact_name: Conschedule.contact_name,
    		slot_start_time: sst,
    		slot_end_time: set
    	}
    	schedule_data.each do |key,value|
    	  params[:schedule][key.to_sym] = value	
    	end	
      @schedule = Schedule.create(schedule_params)	
    end

    def cancel
      @schedule = Schedule.find(params[:id])
      @schedule.update(schedule_params.merge(status: 'cancelled'))	
      redirect_to schedules_path
    end  

    private

      def config_data
        @page_info = {
	        main_heading: Conschedule.main_heading,
		      purpose: Conschedule.purpose,
		      instructions: Conschedule.instructions,
		      location_details: Conschedule.location_details,
		      start_date: Conschedule.start_date,
		      end_date: Conschedule.end_date,
		      original_start_date: Conschedule.start_date,
		      original_end_date: Conschedule.end_date,
		      available_days: Conschedule.available_days,
		      system_time_zone: Conschedule.system_time_zone,
		      black_out_dates: Conschedule.black_out_dates,
		      sun_timings: Conschedule.sun_timings,
		      mon_timings: Conschedule.mon_timings,
		      tue_timings: Conschedule.tue_timings,
		      wed_timings: Conschedule.wed_timings,
		      thu_timings: Conschedule.thu_timings,
		      fri_timings: Conschedule.fri_timings,
		      sat_timings: Conschedule.sat_timings,
		      duration: Conschedule.duration,
		      enable_tz: Conschedule.enable_tz
        }
        gon.page_info = @page_info
      end

      def schedule_params      	
        params.require(:schedule).permit(:app_time_zone, :user_time_zone, :app_tz_offset, :user_tz_offset, :event_name, :event_description, :location_details, :slot_start_time, :slot_end_time, :contact_name, :first_name, :last_name, :phone, :email, :message, :status, :cancel_reason)
      end

      def schedules_search
	      status = params[:status_ids].blank? ? ["active"] : params[:status_ids]
	      current_time = Time.now.in_time_zone(@page_info[:system_time_zone])
	      case params[:period]
	        when "past"
	          schedules = Schedule.past(status,current_time)
	          @date_range_label = "All Past"
	          @filter_message = "You have no past events"
	          @suggestion_message = "past events"
	        when "upcoming"
	          schedules = Schedule.upcoming(status,current_time)
	          @date_range_label = "All Upcoming"
	          @filter_message = "You have no upcoming events yet"
	          @suggestion_message = "upcoming events"
	        when "today"
	          schedules = Schedule.range(status,Time.now.beginning_of_day,Time.now.end_of_day)
	          @date_range_label = "Today"
	          @filter_message = "You have no events for today yet"
	          @suggestion_message = "events for today"
	        when "this_week", "this_month", "range"
	          schedules = Schedule.range(status,params[:start_date],params[:end_date])
	          if params[:period] == "range"
	            @date_range_label = params[:start_date].to_date.strftime("%b %-d, %Y") + " - " + params[:end_date].to_date.strftime("%b %-d, %Y")
	            @filter_message = "You have no events for the date range of #{@date_range_label}"
	            @suggestion_message = "events for #{@date_range_label}"
	          else
	            @date_range_label = params[:period].titleize
	            @filter_message = "You have no events for #{params[:period].gsub('_'," ")} yet"
	            @suggestion_message = "events for #{params[:period].gsub('_'," ")}" 
	          end  
	        else
	          schedules = Schedule.upcoming(status,current_time)
	          @date_range_label = "All Upcoming"
	          @filter_message = "You have no upcoming events yet"
	          @suggestion_message = "upcoming events"
	      end
	      schedules.order("slot_start_time")
	    end

	    def convert_to_tz(date,tz)
        Time.zone = tz
        ctz = Time.zone.parse(date)
        return ctz
	    end	

  end
end
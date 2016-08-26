var page_info = gon.page_info;
if (page_info.enable_tz) {
  var user_tz = jstz.determine().name();
}
else {
  var user_tz = page_info.system_time_zone;
}
var calendar_data, selected_date, formatted_tz, slot_date, slot_start_time, slot_end_time;

function is_null_or_undef(variable) {
  return (variable === null || variable === undefined);
}

function build_calendar(sequence) {
  var date = start_date();
  var no_of_days = 6;
  var count = 0;
  var dates_set = [];
  while (dates_set.length <= no_of_days) {
    if (!black_out_day(moment(date).format("ddd"))) {
      dates_set.push(date);
      count += 1;
    }
    date = sequence == "forward" ? tomorrow(date) : yesterday(date);
  } 
  if ( sequence == "backward" ) {
    dates_set = dates_set.reverse();  
  }
  calendar_data = build_dates_set(dates_set);
  generate_dates_template(calendar_data.days,calendar_data.today);
}

function start_date() {
  return is_null_or_undef(page_info.start_date) ? user_cdt("YYYY-MM-DD") : moment.tz(page_info.start_date,page_info.system_time_zone).format("YYYY-MM-DD") < system_cdt("YYYY-MM-DD") ? system_cdt("YYYY-MM-DD") : moment.tz(page_info.start_date,page_info.system_time_zone).format("YYYY-MM-DD");  
}

function end_date() {
  return is_null_or_undef(page_info.end_date) ? null : moment.tz(page_info.end_date,page_info.system_time_zone).format("YYYY-MM-DD");   
}

function user_cdt(pattern) {
  return moment.tz(user_tz).format(pattern);
}

function system_cdt(pattern) {
  return moment.tz(page_info.system_time_zone).format(pattern);  
}

function black_out_day(weekday) {
  return $.inArray(weekday, page_info.available_days) == -1
}

function tomorrow(date) {
  return moment.tz(date,user_tz).add(1, 'days').format("YYYY-MM-DD");
}

function yesterday(date) {
  return moment.tz(date,user_tz).add(-1, 'days').format("YYYY-MM-DD");
}

function build_dates_set(dates) {
  if ( is_null_or_undef(page_info.calendar_start_date) ) {
    page_info.calendar_start_date = dates[0];
  }
  data = {today: user_cdt("YYYY-MM-DD"), days: [], weeks: []};
  var time_slots;
  $.each(dates, function( index, date ) {
    time_slots = get_time_slots(date);
    day_set = {  
      date: date,
      day_short: date_format(moment.tz(date,user_tz),"day_short"),
      day_full: date_format(moment.tz(date,user_tz),"day_full"),
      date_short: date_format(moment.tz(date,user_tz),"date_short"),
      date_short_lz: date_format(moment.tz(date,user_tz),"date_short_lz"),     
      date_full: date_format(moment.tz(date,user_tz),"date_full"),
      slots: time_slots,
      status: get_day_status(date,end_date(),time_slots.availability),
      separator: is_separator_point(date, dates[index + 1], index)
    }
    data.days.push(day_set);
    if ( day_set.separator == "separator" || index == 6 ) {
      data.weeks.push(build_labels_set(data.days,data.weeks,date));
    }
  });
  return data;
}

function get_time_slots(date) {
  var day = moment(date).format("ddd").toLowerCase();
  var slots = {morning: [], noon: [], availability: true};
  var slot_value;
  if ( system_cdt("YYYY-MM-DD HH:mm") < day_end_time(day,date,false)) {
    if ( date == system_cdt("YYYY-MM-DD") ) {
      var computed_start_time = moment.tz(page_info.system_time_zone).tz(user_tz).format("YYYY-MM-DD HH:mm");
    }
    var start_time = day_start_time(day,date,true);
    var end_time = day_end_time(day,date,true);
    while (start_time < end_time) {
      if ( is_null_or_undef(computed_start_time) ) {
        slot_value = moment(start_time).format("hh:mma");
      }
      else {
        if ( start_time > computed_start_time ) {
          slot_value = moment(start_time).format("hh:mma");
        }  
      }
      if ( !is_null_or_undef(slot_value) ) {
        if ( slot_value.search('am') != -1 ) {
          slots.morning.push(slot_value);
        }
        else {
          slots.noon.push(slot_value);
        }
      }
      start_time = moment(start_time).add(page_info.duration, 'minutes').format("YYYY-MM-DD HH:mm");
    }
  }
  if ( slots.morning.length == 0 && slots.noon.length == 0 ) {
    slots.availability = false;  
  }
  return slots;
}

function timings(day,position) {
  var duration = day + "_timings";
  return position == "start" ? page_info[duration][0] : page_info[duration][1];
}

function day_start_time(day,date,converted) {
  var day_start_time = timings(day,'start');
  var date_time = date + " " + day_start_time;
  var dt_str; 
  if ( converted ) {
    dt_str = moment.tz(date_time,page_info.system_time_zone).tz(user_tz).format("YYYY-MM-DD HH:mm");
  }
  else {
    dt_str = moment.tz(date_time,page_info.system_time_zone).format("YYYY-MM-DD HH:mm");
  }  
  return dt_str;  
}

function day_end_time(day,date,converted) {
  var day_end_time = timings(day,'end');
  var date_time = date + " " + day_end_time;
  var dt_str; 
  if ( converted ) {
    dt_str = moment.tz(date_time,page_info.system_time_zone).tz(user_tz).format("YYYY-MM-DD HH:mm");
  }
  else {
    dt_str = moment.tz(date_time,page_info.system_time_zone).format("YYYY-MM-DD HH:mm");
  }  
  return dt_str;  
}

function date_format(date, format) {
  var date_str;
  switch (format) {
    case "day_short":
      date_str = date.format("ddd");
      break;
    case "day_full":
      date_str = date.format("dddd");
      break;
    case "date":
      date_str = date.format("YYYY-MM-DD");
      break;
    case "date_time":
      date_str = date.format("YYYY-MM-DD HH:mm");
      break;  
    case "date_short":
      date_str = date.format("MMM D");
      break;
    case "date_short_lz":
      date_str = date.format("MMM DD");
      break;    
    case "date_full":
      date_str = date.format("MMMM D, YYYY");
      break;
  }
  return date_str;
}

function get_day_status(date,finish_date,availability) {
  return (date > finish_date || $.inArray(date, black_out_dates()) != -1  || availability == false) ? 'unavailable' : 'available'
}

function black_out_dates() {  
  dates = []
  if ( !$.isEmptyObject(page_info.black_out_dates) ) {
    $.each(page_info.black_out_dates, function( index, date ) {
      dates.push(date_format(moment.tz(date,user_tz),"date")); 
    }); 
  }
  return dates;
}

function is_separator_point(date, next_date, count) {
  return is_null_or_undef(next_date) ? "no-separator" : (week_number(date) != week_number(next_date) && count != 6) ? "separator" : "no-separator"
}

function week_number(date) {
  return moment.tz(date,user_tz).isoWeek()
}

function build_labels_set(days,weeks,date) {
  if ( $.isEmptyObject(weeks) ) {
    var label = page_info.calendar_start_date == days[0].date ? "this week" : get_week_label(date); 
    var set = {label: label, "length": days.length};
  }
  else {
    var total_length = 0;
    $.each(weeks, function( index, week ) {
      total_length += week.length;  
    });  
    var set = {label: get_week_label(date), "length": days.length - total_length};
  }
  return set;
}

function generate_dates_template(days,today_date) {
  var ele = $('.js-days-body');
  $.each(days, function( index, day ) {
    var outer_html = '<div class="fraction js-day-wrapper ' + day.status + ' ' + day.separator + '"></div>';
    if ( day.date === today_date ) {
      var today_html = '<div class="today">– TODAY –</div>';
      outer_html = $(outer_html).append(today_html);
    }
    var day_html = '<div class="day js-show-picker"></div>';
    var day_full_html = '<div></div>';
    var day_short_html = '<strong class="shorthand">' + day.day_short + '</strong><strong class="full">' + day.day_full + '</strong>';
    day_full_html = $(day_full_html).append(day_short_html);
    if ( day.date === today_date ) {
      today_html = '<strong class="today-mobile">(TODAY)</strong>';
      day_full_html = $(day_full_html).append(today_html);
    }
    day_html = $(day_html).append(day_full_html);
    var date_html = '<div><div class="muted shorthand">' + day.date_short + '</div><div class="muted full">' + day.date_full + '</div></div>';
    day_html = $(day_html).append(date_html);
    var right_icon_html = '<i class="icon-arrow-right"></i>';
    day_html = $(day_html).append(right_icon_html);
    outer_html = $(outer_html).append(day_html);
    if ( day.status === "unavailable" ) {
      var status_html = '<span class="status">unavailable</span>';
      outer_html = $(outer_html).append(status_html);
    }
    $('.js-spinner').addClass('hidden');
    $('.js-navigation-prev').show();
  $('.js-navigation-next').show();
    $(ele).append(outer_html);    
  });
  generate_labels_template(calendar_data.weeks);
}

function generate_labels_template(weeks) {
  $(".js-weeks-region").html('<div><div class="scale"></div>');
  var scale = $('.scale');
  $.each(weeks, function( index, week ) {
    var label_html = '<div class="division size' + week.length +'of7"><span class="label">' + week.label + '</span></div>';
    scale.append(label_html);
  });
  load_calendar_navigation();
}

function calendar_date(order,format) {
  var day = order == "start" ? calendar_data.days[0] : calendar_data.days[calendar_data.days.length - 1];
  var date_str;
  switch (format) {
    case "date":
      date_str = day.date;
      break;
    case "short_date_lz":
      date_str = day.date_short_lz;
      break;  
  }
  return date_str;
}

function calendar_loader() {
  $('.js-spinner').removeClass('hidden');
  $('.js-navigation-prev').hide();
  $('.js-navigation-next').hide();
  $('.js-pagination-bar').empty();
  $('.js-weeks-region').empty();
  $('.js-days-body').empty();
}

function load_calendar_navigation() {
  var left_navigation = '<strong class="left" data-nav="previous"><i class="icon-arrow-left-fill"></i>Before <span class="js-period-start-caption">' + calendar_date("start","short_date_lz") + '</span></strong>';
  var right_navigation = '<strong class="right" data-nav="next">After <span class="js-period-end-caption">' + calendar_date("end","short_date_lz") + '</span><i class="icon-arrow-right-fill"></i></strong>';
  $(".js-pagination-bar").append(left_navigation);
  $(".js-pagination-bar").append(right_navigation);
  if ( calendar_date("start","date") != page_info.calendar_start_date ) {
    $('.js-navigation-prev').removeClass('disabled');
    $('.left').removeClass('disabled');
  }
  else {
    $('.js-navigation-prev').addClass('disabled');
    $('.left').addClass('disabled');
  }
  calendar_bind_events();
}

function initialize_calendar(sequence) {
  setTimeout(function() {
    build_calendar(sequence); 
  }, 1000);    
}

function get_week_label(date) {
  var start_week_number = week_number(page_info.calendar_start_date);
  var current_week_number = week_number(date);
  var difference = current_week_number - start_week_number;
  var week_str;
  if ( difference == 1 ) {
    week_str = "next week";
  }
  else {
    week_str = difference + " weeks out";
  }
  return week_str;
}

function navigate(direction) {
  calendar_loader();
  page_info.start_date = direction == "forward" ? tomorrow(calendar_date("end","date")) : yesterday(calendar_date('start',"date"));
  initialize_calendar(direction);
}

function load_calendar_tz(time_zone) {
  user_tz = time_zone;
  calendar_loader();
  page_info.start_date = page_info.original_start_date;
  initialize_calendar("forward");
}

function generate_date_slots_template(index) {
  var time_slots = calendar_data.days[index].slots;
  var am_template = $('<div class="js-am-spot-list"><ul class="spots"></ul></div>');
  var pm_template = $('<div class="js-pm-spot-list"><ul class="spots"></ul></div>');
  if ( time_slots.morning.length != 0 ) {
    $.each(time_slots.morning, function( index, time ) {
      am_template.find("ul.spots").append('<li class="spot available collapsed"><button class="time-button js-select">' + time + '<div class="status">available</div></button><button class="confirm-button hollow base js-confirm">Confirm</button></li>');
      $('.js-spot-list').append(am_template);    
    });
  }
  if ( time_slots.morning.length != 0 && time_slots.noon.length != 0 ) {
    $('.js-spot-list').append('<div class="js-meridiem meridiem" style="display: block;"><div class="text">noon</div></div>');  
  }
  if ( time_slots.noon.length != 0 ) {
    $.each(time_slots.noon, function( index, time ) {
      pm_template.find("ul.spots").append('<li class="spot available collapsed"><button class="time-button js-select">' + time + '<div class="status">available</div></button><button class="confirm-button hollow base js-confirm">Confirm</button></li>');
      $('.js-spot-list').append(pm_template);
    });  
  }
  time_slot_bind_events();
}

function calendar_bind_events() {
  $('.right').on('click', function(){
    navigate("forward");
  });  
  $('.left').on('click', function(){
    navigate("backward");
  });
  $(".js-day-wrapper").click(function() {
    if ( !$(this).hasClass('unavailable') ) {
      $(".js-spot-list").empty();
      selected_date = moment($(this).find('div.full').html(),"MMMM DD, YYYY").format("YYYY-MM-DD");
      $(".selected_day").html(date_format(moment(selected_date),"day_full"));
      $(".selected_date").html(date_format(moment(selected_date),"date_full"));
      $(".selected_tz").html(format_tz($(".chzn-single span").html()));
      slot_date = date_format(moment(selected_date),"date");
      generate_date_slots_template($(".js-day-wrapper").index($(this)));
      reset_state($(".spot:first"));
      wizard_next_step($(this));
    }
  });
}

function time_slot_bind_events() {
  $(".spot").click(function(e) {
    e.preventDefault();
    reset_state($(this));
    $(this).addClass("selected");
    $(this).find(".time-button").addClass("neutral")
  });
  $(".confirm-button").click(function() {
    var time = $(this).parent().find(".time-button").clone().children().remove().end().text();
    $("div.slot-details").html('<i class="icon-clock"></i>' + " " + time + " - " + date_format(moment(selected_date),"day_full") + ", " + date_format(moment(selected_date),"date_full"));
    $("div.tz-details").html('<i class="icon-globe"></i>' + " " + formatted_tz);
    slot_start_time = moment(time,"HH:mma").format("HH:mm");
    slot_end_time = moment(time,"HH:mma").add(page_info.duration,'minutes').format("HH:mm");
    wizard_next_step($(this));    
  });
}

function reset_state(ele) {
  var spots = ele.parent();
  spots.find(".selected").removeClass("selected");
  spots.find(".neutral").removeClass("neutral");
}

function format_tz(tz) {
  formatted_tz = tz;
  if ( tz.search('GMT') != -1 ) {
    formatted_tz = tz.split(" ").slice(1).join(" ");
  }
  return formatted_tz;   
}

function auto_detect_tz() {
  if ( page_info.enable_tz ) {
    var user_time_zone = jstz.determine().name();
    $.each($('li.group-option'), function( index, li ) {
      if ( $(li).data('timezone-identifier') == moment().tz_name(user_time_zone) ) {
        $('#timezone_dropdown_chzn a span').html($(li).html());
        $('.js-timezone-dropdown').val($(li).data('timezone-identifier'));
        $("#schedule_user_tz_offset").val($(li).html());
      }  
      if ( $(li).data('timezone-identifier') == page_info.system_time_zone ) {
        $("#schedule_app_tz_offset").val($(li).html());
      }
    });  
  }
  else {
    $.each($('li.group-option'), function( index, li ) {
      if ( $(li).data('timezone-identifier') == page_info.system_time_zone ) {
        $('#timezone_dropdown_chzn a span').html($(li).html());
        $('.js-timezone-dropdown').val($(li).data('timezone-identifier'));
        $("#schedule_user_tz_offset").val($(li).html());
        $("#schedule_app_tz_offset").val($(li).html());
      }  
    });      
  }
}

$( document ).ready(function() {

  $('#timezonesdropdown').timezonesdropdown();

  auto_detect_tz(); 

  if ( $('.js-timezone-dropdown').val() == "" ) {
    $('.js-timezone-dropdown').val('UTC');
    $("#timezone_dropdown_chzn a span").html("GMT+00:00 UTC Time");
  } 

  load_calendar_tz(user_tz);

  $(".js-navigation-next").click(function() {
    if ( !$(this).hasClass("disabled") ) { 
      navigate("forward");
    }  
  });

  $(".js-navigation-prev").click(function() {
    if ( !$(this).hasClass("disabled") ) { 
      navigate("backward");
    }  
  });

  $(".schedule-event").click(function() {
    $("#schedule_slot_start_time").val(slot_date + " " + slot_start_time);
    $("#schedule_slot_end_time").val(slot_date + " " + slot_end_time);
  });

});
(function ($) {

  var time_zones_data = {
    "US/Canada": [
      { 
       "name":"Pacific Time - US & Canada",
       "identifier":"America/Los_Angeles",
       "standard_title":"Pacific Time - US & Canada"
      },
      {  
       "name":"Mountain Time - US & Canada",
       "identifier":"America/Denver",
       "standard_title":"Mountain Time - US & Canada"
      },
      {  
       "name":"Central Time - US & Canada",
       "identifier":"America/Chicago",
       "standard_title":"Central Time - US & Canada"
      },
      {  
       "name":"Eastern Time - US & Canada",
       "identifier":"America/New_York",
       "standard_title":"Eastern Time - US & Canada"
      },
      {  
       "name":"Atlantic Time",
       "identifier":"America/Halifax",
       "standard_title":"Atlantic Time"
      },
      {  
       "name":"Alaska Time",
       "identifier":"America/Anchorage",
       "standard_title":"Alaska Time"
      },
      {  
       "name":"Arizona Time",
       "identifier":"America/Phoenix",
       "standard_title":"Arizona Time"
      },
      {  
       "name":"Newfoundland Time",
       "identifier":"America/St_Johns",
       "standard_title":"Newfoundland Time"
      },
      {  
       "name":"Hawaii Time",
       "identifier":"Pacific/Honolulu",
       "standard_title":"Hawaii Time"
      }
    ],  
    "America": [
      {  
       "name":"America/Adak",
       "identifier":"America/Adak",
       "standard_title":"GMT-10:00 America/Adak"
      },
      {  
       "name":"Buenos Aires Time",
       "identifier":"America/Argentina/Buenos_Aires",
       "standard_title":"GMT-03:00 Buenos Aires Time"
      },
      {  
       "name":"Asuncion Time",
       "identifier":"America/Asuncion",
       "standard_title":"GMT-04:00 Asuncion Time"
      },
      {  
       "name":"Bogota, Jamaica, Lima Time",
       "identifier":"America/Bogota",
       "standard_title":"GMT-05:00 Bogota, Jamaica, Lima Time"
      },
      {  
       "name":"America/Campo_Grande",
       "identifier":"America/Campo_Grande",
       "standard_title":"GMT-04:00 America/Campo_Grande"
      },
      {  
       "name":"Caracas Time",
       "identifier":"America/Caracas",
       "standard_title":"GMT-04:00 Caracas Time"
      },
      {  
       "name":"America/Godthab",
       "identifier":"America/Godthab",
       "standard_title":"GMT-03:00 America/Godthab"
      },
      {  
       "name":"Atlantic Time",
       "identifier":"America/Goose_Bay",
       "standard_title":"GMT-04:00 Atlantic Time"
      },
      {  
       "name":"Saskatchewan, Guatemala, Costa Rica Time",
       "identifier":"America/Guatemala",
       "standard_title":"GMT-06:00 Saskatchewan, Guatemala, Costa Rica Time"
      },
      {  
       "name":"America/Havana",
       "identifier":"America/Havana",
       "standard_title":"GMT-05:00 America/Havana"
      },
      {  
       "name":"America/Mazatlan",
       "identifier":"America/Mazatlan",
       "standard_title":"GMT-07:00 America/Mazatlan"
      },
      {  
       "name":"Mexico City Time",
       "identifier":"America/Mexico_City",
       "standard_title":"GMT-06:00 Mexico City Time"
      },
      {  
       "name":"Montevideo Time",
       "identifier":"America/Montevideo",
       "standard_title":"GMT-03:00 Montevideo Time"
      },
      {  
       "name":"America/Miquelon",
       "identifier":"America/Miquelon",
       "standard_title":"GMT-03:00 America/Miquelon"
      },
      {  
       "name":"America/Noronha",
       "identifier":"America/Noronha",
       "standard_title":"GMT-02:00 America/Noronha"
      },
      
      {  
       "name":"Santiago Time",
       "identifier":"America/Santiago",
       "standard_title":"GMT-04:00 Santiago Time"
      },
      {  
       "name":"America/Santa_Isabel",
       "identifier":"America/Santa_Isabel",
       "standard_title":"GMT-08:00 America/Santa_Isabel"
      },
      {  
       "name":"Atlantic Standard Time",
       "identifier":"America/Santo_Domingo",
       "standard_title":"GMT-04:00 Atlantic Standard Time"
      },
      {  
       "name":"Brasilia Time",
       "identifier":"America/Sao_Paulo",
       "standard_title":"GMT-03:00 Brasilia Time"
      }
    ],
    "Africa": [
      {  
       "name":"Africa/Cairo",
       "identifier":"Africa/Cairo",
       "standard_title":"GMT+02:00 Africa/Cairo"
      },
      {  
       "name":"Central Africa Time",
       "identifier":"Africa/Johannesburg",
       "standard_title":"GMT+02:00 Central Africa Time"
      },
      {  
       "name":"West Africa Time",
       "identifier":"Africa/Lagos",
       "standard_title":"GMT+01:00 West Africa Time"
      },
      {  
       "name":"Africa/Windhoek",
       "identifier":"Africa/Windhoek",
       "standard_title":"GMT+01:00 Africa/Windhoek"
      }
    ],
    "Asia": [
      {  
       "name":"Syria, Jordan Time",
       "identifier":"Asia/Amman",
       "standard_title":"GMT+02:00 Syria, Jordan Time"
      },
      {  
       "name":"Baghdad, East Africa Time",
       "identifier":"Asia/Baghdad",
       "standard_title":"GMT+03:00 Baghdad, East Africa Time"
      },
      {  
       "name":"Asia/Baku",
       "identifier":"Asia/Baku",
       "standard_title":"GMT+04:00 Asia/Baku"
      },
      {  
       "name":"Jordan, Lebanon Time",
       "identifier":"Asia/Beirut",
       "standard_title":"GMT+02:00 Jordan, Lebanon Time"
      },
      {  
       "name":"Asia/Damascus",
       "identifier":"Asia/Damascus",
       "standard_title":"GMT+02:00 Asia/Damascus"
      },
      {  
       "name":"Asia/Dhaka",
       "identifier":"Asia/Dhaka",
       "standard_title":"GMT+06:00 Asia/Dhaka"
      },
      {  
       "name":"Dubai Time",
       "identifier":"Asia/Dubai",
       "standard_title":"GMT+04:00 Dubai Time"
      },
      {  
       "name":"Asia/Gaza",
       "identifier":"Asia/Gaza",
       "standard_title":"GMT+02:00 Asia/Gaza"
      },
      {  
       "name":"Asia/Irkutsk",
       "identifier":"Asia/Irkutsk",
       "standard_title":"GMT+08:00 Asia/Irkutsk"
      },
      {  
       "name":"Indochina Time",
       "identifier":"Asia/Jakarta",
       "standard_title":"GMT+07:00 Indochina Time"
      },
      {  
       "name":"Israel Time",
       "identifier":"Asia/Jerusalem",
       "standard_title":"GMT+02:00 Israel Time"
      },
      {  
       "name":"Kabul Time",
       "identifier":"Asia/Kabul",
       "standard_title":"GMT+04:30 Kabul Time"
      },
      {  
       "name":"Pacific/Majuro",
       "identifier":"Asia/Kamchatka",
       "standard_title":"GMT+12:00 Pacific/Majuro"
      },
      {  
       "name":"Pakistan, Maldives Time",
       "identifier":"Asia/Karachi",
       "standard_title":"GMT+05:00 Pakistan, Maldives Time"
      },
      {  
       "name":"Kathmandu Time",
       "identifier":"Asia/Kathmandu",
       "standard_title":"GMT+05:45 Kathmandu Time"
      },
      {  
       "name":"India, Sri Lanka Time",
       "identifier":"Asia/Kolkata",
       "standard_title":"GMT+05:30 India, Sri Lanka Time"
      },
      {  
       "name":"China, Singapore, Perth Time",
       "identifier":"Asia/Krasnoyarsk",
       "standard_title":"GMT+07:00 China, Singapore, Perth Time"
      },
      {  
       "name":"Asia/Omsk",
       "identifier":"Asia/Omsk",
       "standard_title":"GMT+06:00 Asia/Omsk"
      },
      {  
       "name":"Asia/Rangoon",
       "identifier":"Asia/Rangoon",
       "standard_title":"GMT+06:30 Asia/Rangoon"
      },
      {  
       "name":"China, Singapore, Perth",
       "identifier":"Asia/Shanghai",
       "standard_title":"GMT+08:00 China, Singapore, Perth"
      },
      {  
       "name":"Tehran Time",
       "identifier":"Asia/Tehran",
       "standard_title":"GMT+03:30 Tehran Time"
      },
      {  
       "name":"Japan, Korea Time",
       "identifier":"Asia/Tokyo",
       "standard_title":"GMT+09:00 Japan, Korea Time"
      },
      {  
       "name":"Asia/Vladivostok",
       "identifier":"Asia/Vladivostok",
       "standard_title":"GMT+10:00 Asia/Vladivostok"
      },
      {  
       "name":"Asia/Yakutsk",
       "identifier":"Asia/Yakutsk",
       "standard_title":"GMT+09:00 Asia/Yakutsk"
      },
      {  
       "name":"Asia/Dhaka",
       "identifier":"Asia/Yekaterinburg",
       "standard_title":"GMT+05:00 Asia/Dhaka"
      },
      {  
       "name":"Asia/Yerevan",
       "identifier":"Asia/Yerevan",
       "standard_title":"GMT+04:00 Asia/Yerevan"
      }
    ],
    "Atlantic": [
      {  
       "name":"Azores Time",
       "identifier":"Atlantic/Azores",
       "standard_title":"GMT-01:00 Azores Time"
      },
      {  
       "name":"Cape Verde Time",
       "identifier":"Atlantic/Cape_Verde",
       "standard_title":"GMT-01:00 Cape Verde Time"
      }
    ],
    "Australia": [
      {  
       "name":"Adelaide Time",
       "identifier":"Australia/Adelaide",
       "standard_title":"GMT+09:30 Adelaide Time"
      },
      {  
       "name":"Brisbane Time",
       "identifier":"Australia/Brisbane",
       "standard_title":"GMT+10:00 Brisbane Time"
      },
      {  
       "name":"Australia/Darwin",
       "identifier":"Australia/Darwin",
       "standard_title":"GMT+09:30 Australia/Darwin"
      },
      {  
       "name":"Australia/Eucla",
       "identifier":"Australia/Eucla",
       "standard_title":"GMT+08:45 Australia/Eucla"
      },
      {  
       "name":"Australia/Lord_Howe",
       "identifier":"Australia/Lord_Howe",
       "standard_title":"GMT+10:30 Australia/Lord_Howe"
      },
      {  
       "name":"Australia/Perth",
       "identifier":"Australia/Perth",
       "standard_title":"GMT+08:00 Australia/Perth"
      },
      {  
       "name":"Sydney, Melbourne Time",
       "identifier":"Australia/Sydney",
       "standard_title":"GMT+10:00 Sydney, Melbourne Time"
      }
    ],
    "UTC": [
      {  
       "name":"UTC Time",
       "identifier":"UTC",
       "standard_title":"GMT+00:00 UTC Time"
      }
    ],
    "Europe": [
      {  
       "name":"Central European Time",
       "identifier":"Europe/Berlin",
       "standard_title":"GMT+01:00 Central European Time"
      },
      {  
       "name":"Eastern European Time",
       "identifier":"Europe/Helsinki",
       "standard_title":"GMT+02:00 Eastern European Time"
      },
      {  
       "name":"UK, Ireland, Lisbon Time",
       "identifier":"Europe/London",
       "standard_title":"GMT+00:00 UK, Ireland, Lisbon Time"
      },
      {  
       "name":"Moscow, Minsk Time",
       "identifier":"Europe/Minsk",
       "standard_title":"GMT+03:00 Moscow, Minsk Time"
      },
      {  
       "name":"Yerevan Time",
       "identifier":"Europe/Moscow",
       "standard_title":"GMT+03:00 Yerevan Time"
      }
    ],
    "Pacific": [
      {  
       "name":"Pacific/Apia",
       "identifier":"Pacific/Apia",
       "standard_title":"GMT+13:00 Pacific/Apia"
      },
      {  
       "name":"Auckland Time",
       "identifier":"Pacific/Auckland",
       "standard_title":"GMT+12:00 Auckland Time"
      },
      {  
       "name":"Pacific/Chatham",
       "identifier":"Pacific/Chatham",
       "standard_title":"GMT+12:45 Pacific/Chatham"
      },
      {  
       "name":"Pacific/Easter",
       "identifier":"Pacific/Easter",
       "standard_title":"GMT-06:00 Pacific/Easter"
      },
      {  
       "name":"Pacific/Fiji",
       "identifier":"Pacific/Fiji",
       "standard_title":"GMT+12:00 Pacific/Fiji"
      },
      {  
       "name":"Pacific/Gambier",
       "identifier":"Pacific/Gambier",
       "standard_title":"GMT-09:00 Pacific/Gambier"
      },
      {  
       "name":"Pacific/Kiritimati",
       "identifier":"Pacific/Kiritimati",
       "standard_title":"GMT+14:00 Pacific/Kiritimati"
      },
      {  
       "name":"Pacific/Majuro",
       "identifier":"Pacific/Majuro",
       "standard_title":"GMT+12:00 Pacific/Majuro"
      },
      {  
       "name":"Pacific/Marquesas",
       "identifier":"Pacific/Marquesas",
       "standard_title":"GMT-10:30 Pacific/Marquesas"
      },
      {  
       "name":"Pacific/Norfolk",
       "identifier":"Pacific/Norfolk",
       "standard_title":"GMT+11:00 Pacific/Norfolk"
      },
      {  
       "name":"Pacific/Noumea",
       "identifier":"Pacific/Noumea",
       "standard_title":"GMT+11:00 Pacific/Noumea"
      },
      {  
       "name":"Pacific/Pago_Pago",
       "identifier":"Pacific/Pago_Pago",
       "standard_title":"GMT-11:00 Pacific/Pago_Pago"
      },
      {  
       "name":"Pacific/Pitcairn",
       "identifier":"Pacific/Pitcairn",
       "standard_title":"GMT-08:00 Pacific/Pitcairn"
      },
      {  
       "name":"Pacific/Tarawa",
       "identifier":"Pacific/Tarawa",
       "standard_title":"GMT+12:00 Pacific/Tarawa"
      },
      {  
       "name":"Pacific/Tongatapu",
       "identifier":"Pacific/Tongatapu",
       "standard_title":"GMT+13:00 Pacific/Tongatapu"
      }
    ]
  };	
  
  $.fn.timezonesdropdown = function (options) {
    return this.each(function () {
      timezones($(this), options);
    });
  };

  function timezones($this, options) {
    var opts = $.extend({}, $.fn.timezonesdropdown.defaults, options);
    var $this = $this;
    var keys = Object.keys(time_zones_data);
    keys.forEach(function(el, i){
      var $el = $('<optgroup label="'+el+'"></optgroup>');	
      time_zones_data[el].forEach(function(place, j){
        var value = place.identifier;
        var name = place.standard_title;
        $el.append('<option value="'+value+'">'+name);
      });
      $this.append($el);
    });
    if ( page_info.enable_tz ) {
      var drop_down_arrow = "<div><b></b></div>";
    }
    else {
      var drop_down_arrow = '';
    }
    var template = '<div title="" style="width: 100%;" class="chzn-container chzn-container-single" id="timezone_dropdown_chzn">' +
      '<a href="javascript:void(0)" class="chzn-single" tabindex="-1">' +
        '<span></span>' +
        drop_down_arrow +
      '</a>' +
      '<div class="chzn-drop">' +
	    '<div class="chzn-search">' +
	      '<input autocomplete="off" type="text" class="chzn-search-input">' +
	    '</div>' +
      '</div>' +
    '</div>';
    $this.after(template);
    timeZoneDropDown($this, opts);
    window['time_zone_drop_down' + $this.attr('id')] = setInterval(function () {
      timeZoneDropDown($this, opts)
    }, 60000);
    toggle_drop_down_listeners();
  }	

  function timeZoneDropDown($this, opts) {
    var keys = Object.keys(time_zones_data);
    var $ot = $("<ul class='chzn-results'></ul>");
    keys.forEach(function(el, i){
    	var selector = el.toLowerCase().replace('/','_');
      $ot.append('<li style="display: list-item;" class="group-result '+ selector +'">'+el+'</li>');
      time_zones_data[el].forEach(function(place, j){
        var value = place.identifier;
        var name = place.standard_title;
        var current_time = moment(moment.utc().format()).tz(value).format('hh:mm A');
        $ot.append('<li data-tz-selector="'+selector+'"'+'data-timezone-identifier="'+value+'"'+'data-time="'+current_time+'"'+'class="group-option active-result">'+name+'</li>');
      });
    });
    if ( $('.chzn-results').length > 0 ) {
      $('.chzn-results').remove();	
    }
    $('.chzn-drop').append($ot);
    filter_options();
    if ( page_info.enable_tz ) {
      bind_event_listener();  
    }
  }

  function toggle_drop_down_listeners() {
    if ( page_info.enable_tz ) {
    	$(".chzn-single").click(function() {
        $("#timezone_dropdown_chzn").toggleClass("chzn-container-active chzn-with-drop");
      });
    }  

    $(document).click(function (e)
    {
      var container = $(".timezone");
      if (!container.is(e.target) && container.has(e.target).length === 0)
      {
        if ( $("#timezone_dropdown_chzn").hasClass("chzn-container-active chzn-with-drop") ) {
          $("#timezone_dropdown_chzn").removeClass("chzn-container-active chzn-with-drop")      
        }
      }
    });

    $(".chzn-search-input").keyup(function() {
      filter_options();  
    });
  }

  function bind_event_listener() {
    $("li.group-option").click(function() {
      $('.chzn-single span').html($(this).html());
      $("#schedule_user_tz_offset").val($(this).html());
      var timezone_identifier = $(this).data('timezone-identifier');
      $("#timezonesdropdown").val(timezone_identifier);
      $("#timezone_dropdown_chzn").toggleClass("chzn-container-active chzn-with-drop");
      load_calendar_tz(timezone_identifier);
    });	
  }

  function filter_options() {
    var input_val = $.trim($(".chzn-search-input").val());
	  var rgxp;
	  var data_set = time_zones_data;
	  if ( input_val != "" ) {
      display_group_option();
      $("li.group-result").hide();
	    rgxp = new RegExp( input_val, 'i' );
	    $("li.group-option").each(function() {
	      if ($(this).html().replace('&amp;','&').match(rgxp) == null) {
	        $(this).removeClass("active-result");	
	      }
	    });
      $("li.group-option.active-result").each(function() {
        $("li.group-result." + $(this).data("tz-selector")).each(function() {
          if (!$(this).is(':visible')) {
            $(this).css({"display": "list-item"}) 
          }
        });
      });  
	  }
	  else {
      display_group_option();	    	
	    display_group_result();
	  }	
  }

  function display_group_option() {
    $("li.group-option").each(function() {
      if ( !$(this).hasClass("active-result") ) {
        $(this).addClass("active-result");    
      }
    });  
  }

  function display_group_result() {
    $("li.group-result").each(function() {
      if (!$(this).is(':visible')) {
        $(this).css({"display": "list-item"}) 
      }
    });  
  }
  
}(jQuery));	
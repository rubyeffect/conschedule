function init() {
  if ( location.href.indexOf("status_ids[]=cancelled") > 0 ) {
    $(".filter-cancel").prop('checked', true);
    $(".events-tab").html("Cancelled Events<i class='icon-angle-down'></i>");
  }

  if ( location.href.indexOf("status_ids[]=active") == -1 ) {
    $(".filter-active").prop('checked', false);
  }  
  else {
    $(".events-tab").html("Active Events<i class='icon-angle-down'></i>");
  }

  if ( location.href.indexOf("status_ids[]=active") > 0 && location.href.indexOf("status_ids[]=cancelled") > 0 ) {
    $(".events-tab").html("All Events<i class='icon-angle-down'></i>");
  }  
}

function url_param(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
    return "";
  }
  else{
    return results[1] || 0;
  }
}

function cancel_event_bind() {
  $(".js-undo-cancel-event").click(function() {
    $("#popup-region").empty();    
  });
}

function update_params(include_status) {
  var query_string = [];
  if ( $("input[name=daterangepicker_period]").val() != "" ) {
    var start_date = $("input[name=daterangepicker_start]").val();
    var end_date = $("input[name=daterangepicker_end]").val();
    var period = $("input[name=daterangepicker_period]").val();  
  }
  else {
    var start_date = url_param("start_date");
    var end_date = url_param("end_date");
    var period = url_param("period");
  }
  if (include_status) {
    $('.js-checkbox:checked').each(function() {
      if ( $(this).data("filter-type") == "active" ) {
        query_string.push("status_ids[]=active");
      }
      else {
        query_string.push("status_ids[]=cancelled");
      }
    });  
  }
  if (start_date != "" && end_date != "") {
    query_string.push("start_date="+start_date);
    query_string.push("end_date="+end_date);
    query_string.push("period="+period);     
  }
  var url = location.protocol + '//' + location.host + location.pathname;
  if ( query_string.length != 0 ) {
    query_string = query_string.join("&");
    location.replace(url + "?" + query_string);
  }
  else {
    location.replace(url); 
  }  
}

$( document ).ready(function() {

  init();

  if ( location.href.indexOf("status_ids[]") > 0 ) {
    $(".js-nested-filters-region").toggle();
    var text = $('.filter-label').text();
    $('.filter-label').text(text == "Show Filter" ? "Hide Filter" : "Show Filter");
    $('.js-clear-filters').show();
  }
  else {
    $(".filter-active").prop('checked', true);  
  }

  $(".js-title-region").click(function() {
    var event_block = $($(this).parent());
    if ( event_block.hasClass('expanded') ) {
      event_block.removeClass('expanded').addClass('collapsed');
      event_block.find(".js-content-body").slideUp( "slow" );   
    } 
    else {
      $(".js-results-region").find(".expanded").removeClass("expanded");
      $(".js-content-body:visible").slideUp( "slow" );  
      event_block.removeClass('collapsed').addClass('expanded');
      event_block.find(".js-content-body").slideDown( "slow" );
    } 
  });   

  $(".js-cancel-event-button").click(function(e) {
    e.preventDefault();
    var id = $(this).data('sch-id');
    var time = $.trim($(this).parents().eq(2).find(".time").html());
    var name = $.trim($(this).parents().eq(2).find(".user-name").html());
    var schedule_name = $.trim($(this).parents().eq(2).find(".schedule-name").html());
    var auth_token = $('meta[name=csrf-token]').attr('content');
    if (window.location.pathname == "/") {
      var action_name = '/schedules/' + id + '/cancel';
    }
    else {
      var action_name = window.location.pathname + "/" + id + '/cancel';
    }
    var template = '<div id="popup-region"><div class="popup-overlay"><div class="close-overlay js-close"></div><div class="popup"><form class="schedule_cancel_form" method="post" novalidate="novalidate" remote="true" action="'+ action_name +'"><div class="popup-content"><input type="hidden" name="authenticity_token" value="'+ auth_token +'"><div class="text-center"><h2 class="mbm">Cancel Event</h2><div class="schedule-title">'+ schedule_name +'</div><div><strong class="scheduled-user">'+ name +'</strong></div><div class="mbm schedule-timings">'+ time +'</div></div><div class="mbm">Please confirm that you would like to cancel this event. A cancellation email will also go out to the invitee.</div><textarea class="mbm js-cancel-reason" maxlength="255" name="schedule[cancel_reason]" placeholder="Add an optional cancellation message."></textarea></div><div class="popup-buttons"><div class="col1of2"><button type="submit" class="js-submit-cancel-event" href="">Cancel Event</button></div><div class="col1of2"><button type="reset" class="hollow js-undo-cancel-event" href="">Nevermind</button></div></div></form></div></div></div>';
    $("#popup-region").append(template);
    cancel_event_bind();
  });

  $(".js-filters-toggle").click(function() {
    $(".js-nested-filters-region").toggle();
    var text = $('.filter-label').text();
    $('.filter-label').text(text == "Show Filter" ? "Hide Filter" : "Show Filter");
  });

  $(".events-tab, .js-close").click(function() {
    $(".event-options").toggle();  
  }); 

  $(".js-apply").click(function() {
    update_params(true);  
  }); 

  $(".js-reset-filters, .js-clear-filters").click(function() {
    var url = location.protocol + '//' + location.host + location.pathname;
    location.replace(url);    
  });

  $('.js-daterangepicker-toggle').daterangepicker({
    locale: {
      format: 'YYYY-MM-DD'
    }
  });

  $('.js-daterangepicker-toggle').on('hide.daterangepicker', function(ev, picker) {
    if ( $('input[name="daterangepicker_period"]').val() != "") {
      update_params(false);  
    }
  });

});
function wizard_next_step(ele) {
  var current_fs, next_fs, left, opacity, scale, animating;
  if(animating) return false;
  animating = true;
  current_fs = ele.closest('.section-division');
  next_fs = current_fs.next();
  current_fs.hide();
  next_fs.show();
}

function wizard_previous_step(ele) {
  var current_fs, previous_fs, left, opacity, scale, animating;
  if (animating) return false;
  animating = true;
  current_fs = ele.closest('.section-division');
  previous_fs = $(".section-division:first");
  current_fs.hide();
  previous_fs.show();
}

$( document ).ready(function() {

  $(".schedule_wizard").validate({
    errorClass: "error-message",
    rules: {
      "schedule[first_name]": "required",
      "schedule[email]": {
        required: true,
        email: true
      },
      "schedule[phone]": "required"
    },
    messages: {
      "schedule[first_name]": {
        required: "can't be blank",
      },
      "schedule[email]": {
        required: "can't be blank",
        email: "Email format is invalid."
      },
      "schedule[phone]": {
        required: "can't be blank",
      }
    }
  });

  $(".step-back").click(function() {
    if ( !$(this).hasClass('unavailable') ) {
      wizard_previous_step($(this));
    }
  });

});  
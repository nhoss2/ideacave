var app = app || {}

$(function(){

  // Constants
  var TRANSITION_PERIOD = 1000;

  // all the ugly transition code written as functions in this object
  app.transitions = {

    showComments: function(){
      $('#comments').css({'display': 'block'});
      $('#idea-list').animate({'width': '802px'}, TRANSITION_PERIOD);
      $('#comments').animate({ 'width': '400px' }, TRANSITION_PERIOD);
      $('.single-idea').animate({'width': '400px'}, TRANSITION_PERIOD);
      $('span.date-author').css({'float': 'left'});
    }
    
  };

  $('.bar-item').on('click', function(){
    app.transitions.showComments();
  });

});

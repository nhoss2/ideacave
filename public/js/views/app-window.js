var app = app || {};

(function(){
  app.appWindow = Backbone.View.extend({

    el: $('#main-app-window'),

    initialize: function(){
      // get ideas from database
      app.ideas.fetch();

      // check if user is logged in

    },

  });
})();

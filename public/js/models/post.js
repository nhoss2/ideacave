var app = app || {};

(function(){
  app.Post = Backbone.Model.extend({
    defaults: function(){
      return {
        title: "",
        description: "",
        date: "",
        author: ""
      }
    },

    urlRoot: '/api/ideas/'

  });
})();

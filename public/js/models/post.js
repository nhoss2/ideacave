var app = app || {};

(function(){
  app.Post = Backbone.Model.extend({
    defaults: function(){
      return {
        title: "",
        description: "",
        date: "",
        author: "",
        comments: new app.Comments()
      }
    },

    urlRoot: '/api/ideas/'

  });
})();

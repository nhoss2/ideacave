var app = app || {};

(function(){
  app.Post = Backbone.Model.extend({
    defaults: function(){
      return {
        title: "empty Idea",
        description: "empty",
        date: "",
        author: ""
      }
    },
  });
})();

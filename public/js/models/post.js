var app = app || {};

(function(){
  app.Post = Backbone.Model.extend({
    defaults: function(){
      return {
        title: "empty Idea",
        description: "empty",
        date: this.getDateString(),
        author: ""
      }
    },

    getDateString: function(){
      var now = new Date();
      return now.toDateString().substr(4);
    }
  });
})();

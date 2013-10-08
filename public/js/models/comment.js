var app = app || {};

(function(){
  app.Comment = Backbone.Model.extend({
    defaults: function(){
      return {
        comment: "",
        author: "",
        time: ""
      }
    }
  });


})();

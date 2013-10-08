var app = app || {};

(function(){
  app.Comments = Backbone.Collection.extend({
    model: app.Comment,
  });
})();

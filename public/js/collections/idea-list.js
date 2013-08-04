var app = app || {};

(function(){
  var IdeaList = Backbone.Collection.extend({
    model: app.Post,

    url: '/ideas',
  });

  app.ideas = new IdeaList();
})();

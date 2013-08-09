var app = app || {};

(function(){
  var IdeaList = Backbone.Collection.extend({
    model: app.Post,

    url: '/api/ideas',

  });

  app.ideas = new IdeaList();
})();

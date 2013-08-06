var app = app || {};

(function(){
  var IdeaList = Backbone.Collection.extend({
    model: app.Post,

    url: '/api/ideas',

    initialize: function(){
      this.fetch();
    }

  });

  app.ideas = new IdeaList();
})();

var app = app || {};

(function(){
  var IdeaList = Backbone.Collection.extend({
    model: app.Post,

    newModelId: function(){
      return this.models.length + 1;
    }

  });

  app.ideas = new IdeaList();
})();

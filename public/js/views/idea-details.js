var app = app || {};

(function(){
  app.IdeaDetailsView = Backbone.View.extend({

    template: Mustache.compile($('#single-idea-template').html()),

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      $('#main-app-window').html(this.el);
      return this;
    },

    loadModel: function(ideaId){
      var idea = new app.Post({id: ideaId});
      this.model = idea;
      var self = this;
      idea.fetch({success: function(){
        self.render();
      }});
    },

  });
})();

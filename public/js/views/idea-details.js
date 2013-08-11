var app = app || {};

(function(){
  app.IdeaDetailsView = Backbone.View.extend({

    template: Mustache.compile($('#single-idea-template').html()),

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      $('#main-app-window').html(this.el);
      return this;
    },

  });
})();

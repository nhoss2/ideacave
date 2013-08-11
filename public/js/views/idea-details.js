var app = app || {};

(function(){
  app.IdeaDetailsView = Backbone.View.extend({

    template: Mustache.compile($('#idea-details-template').html()),

    className: 'single-idea',

    render: function(){
      this.removeLoading();
      this.$el.html(this.template(this.model.toJSON()));
      $('#main-app-window').html(this.el);
      return this;
    },

    loadModel: function(ideaId){
      // stop any event handlers from previous model
      this.stopListening();

      // create new model, set the id of the model and then
      // fetch the data for that model form the server
      this.model = new app.Post({id: ideaId});
      this.model.fetch();

      this.render();

      this.listenTo(this.model, 'change', this.render);
    },

    removeLoading: function(){
      // if the model has a title, it means the model's
      // data from the server has been loaded so the
      // 'loaded' attribute is set on the model which
      // changes what is rendered on the template
      if (this.model.get('title') != ''){
        this.model.set({loaded: true});
      }
    }
  });
})();

var app = app || {};

(function(){
  app.IdeaDetailsView = Backbone.View.extend({

    template: Mustache.compile($('#idea-details-template').html()),

    className: 'single-idea',

    render: function(){
      this.checkLoaded();
      this.$el.html(this.template(this.model.toJSON()));
      if (this.commentsView) {
        this.$el.append(this.commentsView.el);
      }
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

    checkLoaded: function(){
      // if the model has a title, it means the model's
      // data from the server has been loaded so the
      // 'loaded' attribute is set on the model which
      // changes what is rendered on the template
      if (this.model.get('title') != '' && !this.model.get('loaded')){
        this.model.set({loaded: true});

        this.displayComments();
      }
    },

    displayComments: function(){
      // remove previous view if it exists
      if (this.commentsView) this.commentsView.remove();

      // create a view for the comments
      this.commentsView = new app.CommentsView({
        collection: this.model.get('comments')
      });

      this.listenTo(this.model.get('comments'), 'add', this.saveComments);
    },

    saveComments: function(){
      console.log('save called');
      // when saving a new comment, set a temporary attribute on
      // model to indicate to server that a there is a new
      // comment to be saved. Otherwise the server will think
      // that the model is being edited and will not allow the
      // edit if the request is not done by the user who created 
      // the model
      this.model.save({
        comments: this.commentsView.collection,
        newComment: true
      });
    },

    commentsChanged: function(){
      console.log('comments changed');
    }

  });
})();

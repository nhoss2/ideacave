var app = app || {};

(function(){
  app.IdeaDetailsView = Backbone.View.extend({

    template: Mustache.compile($('#idea-details-template').html()),

    className: 'single-idea',

    events: function(){
      return {
        'click a#edit-post': 'editPost',
        'click a#delete-post': 'deletePost'
      }
    },

    render: function(){
      this.checkLoaded();
      this.$el.html(this.template(this.model.toJSON()));
      if (this.commentsView) {
        this.$el.append(this.commentsView.el);
      }
      $('#main-app-window').html(this.el);
      console.log('rendering');
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

      this.listenTo(this.model, 'change', this.modelChange);
    },

    modelChange: function(){
      this.render();
    },

    checkLoaded: function(){
      // if the model has a title, it means the model's
      // data from the server has been loaded so the
      // 'loaded' attribute is set on the model which
      // changes what is rendered on the template
      if (this.model.get('title') != '' && !this.model.get('loaded')){
        this.model.set({loaded: true});

        // check if the post was created by the logged in
        // user and if so, show the edit and delete buttons
        if (app.auth.name === this.model.get('author')){
          this.model.set({isauthor: true});
        }


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

    editPost: function(e){
      e.preventDefault();

      if (!app.auth.loggedIn()) return false;

      // replace the idea title and description with text
      // fields
      var ideaArea = this.$el.find('.idea-details');
      var editView = new EditIdeaView({model: this.model});
      ideaArea.html(editView.render().el);

      // if editing has been cancelled, render the old post
      var self = this;
      editView.on('remove', function(){
        self.render();
      });

    },

    deletePost: function(e){
      e.preventDefault();

      if (!app.auth.loggedIn()) return false;

      var modalView = new DeleteModalView();

      app.modal.show(modalView.el);
    }

  });

  var EditIdeaView = Backbone.View.extend({

    template: Mustache.compile($('#idea-edit-template').html()),

    events: function(){
      return {
        'click a#save-post-edit': 'saveEdit',
        'click a#cancel-post-edit': 'cancelEdit'
      }
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    saveEdit: function(e){
      e.preventDefault();

      // change only the title and description of the model
      this.model.set('title', this.$el.find('input#edit-title').val());
      this.model.set('description', this.$el.find('textarea').val());

      // call the save method and then remove this view. The
      // post will be automatically rendered with the new
      // attributes as the IdeaDetailsView is listening to the
      // models change event.
      this.model.save();
      this.remove();
    },

    cancelEdit: function(e){
      e.preventDefault();
      this.trigger('remove');
      this.remove();
    }

  });

  var DeleteModalView = Backbone.View.extend({

    template: Mustache.compile($('#delete-post-template').html()),

    events: function(){
      return {
        'click #confirm-delete': 'deletePost',
        'click #cancel-delete': 'cancel'
      }
    },

    initialize: function(){
      console.log('i');
      this.render();
    },

    render: function(){
      this.$el.html(this.template());
      return this;
    }


  });
})();

var app = app || {};

(function(){
  var SingleCommentView = Backbone.View.extend({

    className: 'single-comment',

    template: Mustache.compile($('#comment-template').html()),

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

  });

  app.CommentsView = Backbone.View.extend({

    id: 'comments',

    template: Mustache.compile($('#comments-template').html()),

    events: function(){
      return {
        'click #new-comment a.action-button': 'submitComment'
      }
    },

    initialize: function(){
      this.render();

      // for any existing comments in the collection, render
      // each of them.
      var self = this;
      this.collection.forEach(function(comment){
        self.add(comment);
      });

      this.listenTo(this.collection, 'add', this.add);
    },

    render: function(){
      this.$el.html(this.template());
      this.showHideTitle();
    },

    // called when collection fires 'add' event
    add: function(model){
      var comment = new SingleCommentView({model: model});
      this.$el.append(comment.render().$el);
      this.showHideTitle();
    },

    submitComment: function(e){
      e.preventDefault();
      var content = this.$el.find('#new-comment textarea').val();

      if (content == '') return;

      this.collection.add({
        comment: content,
        author: app.auth.name
      });

      this.$el.find('#new-comment textarea').val('');
    },

    showHideTitle: function(){
      // hide the title for the comments section if there are
      // no comments in the collection
      var title = this.$el.find('h3#comment-section-title');

      if (this.collection.length === 0){
        title.css({display: 'none'});
      } else {
        title.css({display: 'block'});
      }
    }

  });
})();

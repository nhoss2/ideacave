var app = app || {};

(function(){

  SingleIdeaView = Backbone.View.extend({

    className: 'single-idea',

    template: Mustache.compile($('#single-idea-template').html()),

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    showComments: function(){
      console.log('showing comments!');
    }

  });

  app.IdeasView = Backbone.View.extend({

    id: 'idea-list',

    collection: app.ideas,

    render: function(){
      $('#main-app-window').html(this.el);
    },

    initialize: function(){
      this.listenTo(this.collection, 'add', this.add);

      this.collection.fetch();
      this.render();
    },

    add: function(model){
      var newPost = new SingleIdeaView({model: model});
      this.$el.append(newPost.render().el);
    },

  });
})();

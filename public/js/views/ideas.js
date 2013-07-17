var app = app || {};

(function(){
  app.IdeasView = Backbone.View.extend({

    el: $('#idea-list'),

    render: function(){
      
    },

    collection: app.ideas,

    initialize: function(){
      this.listenTo(this.collection, 'add', this.add);
      this.listenTo(this.collection, 'remove', this.removeOne);
    },

    add: function(model){
      var newPost = new app.SingleIdeaView({model: model});
      this.$el.append(newPost.render().el);
    },

    removeOne: function(model){

    }

  });
})();

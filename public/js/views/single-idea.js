var app = app || {};

(function(){
  app.SingleIdeaView = Backbone.View.extend({

    tagName: 'div',
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
})();

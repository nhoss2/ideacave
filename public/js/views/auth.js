var app = app || {};

(function(){
  app.AuthView = Backbone.View.extend({

    template: Mustache.compile($('#login-template').html()),
    id: 'login-form',

    render: function(){
      this.$el.html(this.template);
      return this;
    },

    showModal: function(){
      $('body').append(this.render().el);
      this.$el.css({opacity: 0});
      this.$el.animate({opacity: 1}, 1000);
    }

  });
})();

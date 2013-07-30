var app = app || {};

(function(){
  app.AuthView = Backbone.View.extend({

    template: Mustache.compile($('#login-template').html()),

    render: function(){
      this.$el.html(this.template);
      return this;
    },

    showModal: function(){
      app.modal.show(this.render().$el.html());
    }

  });
})();

var app = app || {};

(function(){
  app.ModalView = Backbone.View.extend({

    template: Mustache.compile($('#modal-template').html()),
    id: 'modal-view',

    render: function(content){
      console.log($('#modal-template').html());
      this.$el.html(this.template({content: content}));
      return this;
    },

    showModal: function(content){
      $('body').append(this.render(content).el);
      console.log(this.el);
      this.$el.css({opacity: 0});
      this.$el.animate({opacity: 1}, 400);
    }

  });
})();

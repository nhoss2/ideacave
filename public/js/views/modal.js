var app = app || {};

(function(){
  var ModalView = Backbone.View.extend({

    template: Mustache.compile($('#modal-template').html()),
    id: 'modal-view',

    events: function(){
      return {
        'click #modal-view': 'logClick',
        'click a#close-modal': 'close'
      }
    },

    render: function(){
      this.$el.html(this.template());
      return this;
    },

    // the modal is shown by calling app.modal.show(content)
    // where content is what will be appended inside the modal
    // dialogue
    show: function(content){
      $('body').append(this.render().el);
      this.$el.find('#modal-inside').append(content)
      this.$el.css({opacity: 0});
      this.$el.animate({opacity: 1}, 400);
    },

    close: function(){
      var self = this;
      app.router.navigate('/');
      this.$el.animate({opacity: 0}, 400, 'ease', function(){
        self.$el.remove();
      });
    },

    logClick: function(e){
      // check if the click was on the black background of the
      // modal and if it was, close the modal
      if ($(e.target).attr('id') == 'modal-view'){
        this.close();
      }
    },


  });

  app.modal = new ModalView();
})();

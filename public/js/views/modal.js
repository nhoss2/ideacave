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

    render: function(content){
      this.$el.html(this.template({content: content}));
      return this;
    },

    show: function(content){
      console.log(this.el);
      $('body').append(this.render(content).el);
      this.$el.css({opacity: 0});
      this.$el.animate({opacity: 1}, 400);
    },

    close: function(){
      var self = this;
      this.$el.animate({opacity: 0}, 400, 'ease', function(){
        self.$el.remove();
        app.router.navigate('/');
      });
    },

    logClick: function(e){
      // check if the click was on the black background of the
      // modal and if it was, close the modal
      if ($(e.srcElement).attr('id') == 'modal-view'){
        this.close();
      }
    },


  });

  app.modal = new ModalView();
})();

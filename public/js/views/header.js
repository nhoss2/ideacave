var app = app || {};

(function(){
  app.HeaderView = Backbone.View.extend({
    el: $('#new-idea'),

    events: {
      'click #cancel-idea': 'closeSubmission',
      'click #submit-idea': 'submitSubmission'
    },

    closeSubmission: function(){
      this.$el.find('input, textarea').val('');
      this.$el.css({display: 'none'});
    },

    submitSubmission: function(){
      app.ideas.add({
        title: this.$el.find('input').val(),
        description: this.$el.find('textarea').val()
      });
      this.closeSubmission();
      console.log(app.ideas.at(0));
    }

  });
})();

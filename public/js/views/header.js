var app = app || {};

(function(){
  app.HeaderView = Backbone.View.extend({
    el: $('#new-idea'),

    events: {
      'click #cancel-idea': 'closeSubmission',
      'click #submit-idea': 'submitSubmission'
    },

    openSubmission: function(){
      if (app.auth.loggedIn()) this.$el.show();
    },

    closeSubmission: function(){
      this.$el.find('input, textarea').val('');
      this.$el.hide();
      app.router.navigate('/');
    },

    submitSubmission: function(){
      app.ideas.create({
        title: this.$el.find('input').val(),
        description: this.$el.find('textarea').val()
      });
      this.closeSubmission();
      console.log(app.ideas.at(0));
    }

  });
})();

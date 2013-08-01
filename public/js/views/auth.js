var app = app || {};

(function(){
  app.auth = {}; // object to store details about user
  app.AuthView = Backbone.View.extend({

    template: Mustache.compile($('#login-template').html()),

    events: function(){
      return {
        'click a#log-in-button': 'login',
        'keyup input': 'logKey'
      }
    },

    render: function(error){
      this.$el.html(this.template({errorMessage: error}));
      return this;
    },

    showModal: function(){
      app.modal.show(this.render().$el);
    },

    login: function(){
      $.ajax({
        type: 'POST',
        url: '/login',
        data: {
          username: $('#login-form input#email-address').val(),
          password: $('#login-form input#password').val()
        },
        global: false,
        context: this,
        success: function(response){
          app.auth.name = response.name
          $('#header #not-authenticated').hide();
          $('#header #authenticated').prepend(app.auth.name).show();
          app.modal.close();
        },
        error: function(xhr, type){
          if (type == 'error' && xhr.status == 401){
            this.render('error: incorrect usename or password');
          }
        }
      });
    },

    logKey: function(e){
      if (e.keyCode == 13){
        this.login();
      }
    }

  });
})();

var app = app || {};

(function(){
  app.auth = {}; // object to store details about user
  app.AuthView = Backbone.View.extend({

    // can be either 'login' or 'register'
    mode: '',

    loginTemplate: Mustache.compile($('#login-template').html()),
    registerTemplate: Mustache.compile($('#register-template').html()),

    events: function(){
      return {
        'click a#log-in-button': 'login',
        'click a#register-button': 'register',
        'keyup input': 'logKey'
      }
    },

    initialize: function(){
      this.checkLoggedIn();
    },

    loginRender: function(error){
      this.mode = 'login';
      this.$el.html(this.loginTemplate({errorMessage: error}));
      return this;
    },

    registerRender: function(error){
      this.mode = 'register';
      this.$el.html(this.registerTemplate({errorMessage: error}));
      return this;
    },

    showLogin: function(){
      app.modal.show(this.loginRender().$el);
    },

    showRegister: function(){
      app.modal.show(this.registerRender().$el);
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
          this.displayName(response.name);
        },
        error: function(xhr, type){
          if (type == 'error' && xhr.status == 401){
            this.loginRender('error: incorrect usename or password');
          }
        }
      });
    },

    logKey: function(e){
      if (e.keyCode == 13){
        if (this.mode == 'login') this.login();
        if (this.mode == 'register') this.register();
      }
    },

    register: function(){
      $.ajax({
        type: 'POST',
        url: '/register',
        data: {
          name: $('#register-form #users-name').val(),
          username: $('#register-form #email-address').val(),
          password: $('#register-form #password').val()
        },
        global: false,
        context: this,
        success: function(response){
          this.displayName(response.name);
        },
        error: function(xhr, type){
          if (type == 'error' && xhr.status == 400){
            this.registerRender('error: ' + xhr.response);
          }
        }
      });
    },

    displayName: function(name){
      app.auth.name = name
      $('#header #not-authenticated').hide();
      $('#header #authenticated').prepend(name).show();
      app.modal.close();
    },

    // In the case that the user refreshes or comes back to the
    // app later, this is a hacky way to check if the user is
    // logged in or not.
    checkLoggedIn: function(){
      var self = this;
      $.getJSON('/api/currentuser', function(user){
        if (!user.name) return;
        else self.displayName(user.name);
      });
    }
  });
})();

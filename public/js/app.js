var app = app || {};

$(function(){

  var ideas = new app.IdeasView();
  var header = new app.HeaderView();
  var auth = new app.AuthView();

  // Router
  var Router = Backbone.Router.extend({
    routes: {
      'new': 'newPost',
      'idea/:id': 'listComments',
      'login': 'login',
      'register': 'register'
    },

    newPost: function(){
      $('#new-idea').css({display: 'block'});
    },

    listComments: function(id){
      console.log(id + ' is id of idea to get comments of.');
    },

    login: function(){
      auth.showLogin();
    },

    register: function(){
      auth.showRegister();
    }
  });

  app.router = new Router();
  Backbone.history.start();

});


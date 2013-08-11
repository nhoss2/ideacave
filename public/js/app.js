var app = app || {};

$(function(){

  var ideas = new app.IdeasView();
  var idea = new app.IdeaDetailsView();
  var header = new app.HeaderView();
  var auth = new app.AuthView();

  // Router
  var Router = Backbone.Router.extend({
    routes: {
      'new': 'newPost',
      'idea/:id': 'listComments',
      'login': 'login',
      'register': 'register',
    },

    newPost: function(){
      header.openSubmission();
    },

    listComments: function(id){
      idea.loadModel(id);
    },

    login: function(){
      auth.showLogin();
    },

    register: function(){
      auth.showRegister();
    },

  });

  app.router = new Router();
  Backbone.history.start();

});


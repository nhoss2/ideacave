var app = app || {};

$(function(){

  // initialise views
  var ideas = new app.IdeasView();
  var idea = new app.IdeaDetailsView();
  var header = new app.HeaderView();
  var auth = new app.AuthView();

  // Router
  var Router = Backbone.Router.extend({
    routes: {
      '' : 'index',
      'new': 'newPost',
      'idea/:id': 'loadIdea',
      'login': 'login',
      'register': 'register',
    },

    index: function(){
      ideas.render();
    },

    newPost: function(){
      header.openSubmission();
    },

    loadIdea: function(id){
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


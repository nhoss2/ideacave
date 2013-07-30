var app = app || {};

$(function(){

  var ideas = new app.IdeasView();
  var header = new app.HeaderView();
  var auth = new app.AuthView();
  var modal = new app.ModalView();

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
      modal.showModal('log in form');
    },

    register: function(){
      console.log('registering');
    }
  });

  var router = new Router();
  Backbone.history.start();

});


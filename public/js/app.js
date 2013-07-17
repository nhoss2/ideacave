var app = app || {};

$(function(){

  // Router
  var Router = Backbone.Router.extend({
    routes: {
      'new': 'newPost',
      'idea/:id': 'listComments'
    },

    newPost: function(){
      $('#new-idea').css({display: 'block'});
    },

    listComments: function(id){
      console.log(id + ' is id of idea to get comments of.');
    }
  });

  var router = new Router();
  Backbone.history.start();

  var ideas = new app.IdeasView();
  var header = new app.HeaderView();
});


var app = app || {};

(function(){
  app.Post = Backbone.Model.extend({
    defaults: function(){
      return {
        title: "",
        description: "",
        date: "",
        author: "",
        comments: []
      }
    },

    initialize: function(){
      this.on('change', this.checkComments);
    },

    checkComments: function(){
      // kind of a hack that makes the comments attribute a collection if they
      // are an array.
      if (_.isArray(this.get('comments'))){
        this.set('comments', new app.Comments(this.get('comments')));
      }
    },

    urlRoot: '/api/ideas/'

  });
})();

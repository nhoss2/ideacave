var NeDB = require('nedb');
var sanitize = require('validator').sanitize;

var database = new NeDB({
  filename: __dirname + '/database/ideas.db',
  autoload: true
});

// remove the 'last' attribute on the model
var removeLastAttr = function(idea){
  delete idea.last;
  database.update({id: idea.id}, idea, {}, function(err){
    if (err) throw err;
  });
};

module.exports = {

  // saves new idea to database and calls the callback with the
  // argument being the id of the new idea
  create: function(data, callback){

    // look for an idea with an attribute 'last' being true.
    // This means that this was the last idea put on the
    // database. This is for the ID for the new idea
    database.findOne({last: true}, function(err, idea){
      if (err) throw err;

      if (idea){
        data.id = idea.id + 1;
        removeLastAttr(idea);
      } else {
        data.id = 1;
      }

      data.last = true;
      database.insert(data, function(err, newIdea){
        if (err) throw err;
      });

      callback(data.id);
    });

  },

  getAll: function(callback){
    database.find({}, function(err, ideas){
      if (err) throw err;

      callback(ideas);
    });
  },

  getSingleIdea: function(ideaId, callback){
    database.findOne({id: parseInt(ideaId)}, function(err, idea){
      if (err) throw err;
      if (idea) return callback(idea);
      return callback({});
    });
  },

  addComment: function(ideaId, comment, callback){
    database.findOne({id: parseInt(ideaId)}, function(err, idea){
      if (err) throw err;
      if (idea){
        if (idea.comments){
          idea.comments.push(comment);
        } else {
          idea.comments = [comment];
        }
        database.update({id: idea.id}, idea, {}, function(err){
          if (err) throw err;

          return callback(idea);
        });
      } else {
        return callback(null);
      }
    })
  },

  /*
   * callback takes two arguments:
   *   - idea
   *   - error: string describing error
   */
  editPost: function(postEdit, callback){
    database.findOne({id: postEdit.id}, function(err, idea){
      if (err) throw err;

      // idea does not exist
      if (!idea) return callback(null, 'error');

      // if user is not allowed to edit idea, return error
      if (idea.author != postEdit.author) return callback(null, 'error');

      idea.title = postEdit.title;
      idea.description = postEdit.description;

      database.update({id: idea.id}, idea, {}, function(err){
        if (err) throw err;

        return callback(idea);
      });

    });
  }

};

var NeDB = require('nedb');
var sanitize = require('validator').sanitize;

var database = new NeDB({
  filename: __dirname + '/database/ideas.db',
  autoload: true
});

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

      console.log(ideas);
      callback(ideas);
    });
  }

};

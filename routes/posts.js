var ideas = require('../ideas');

module.exports = {

  /*
   * POST new idea
   */
  create: function(req, res){

    var now = new Date();

    // create an object which will be sent back
    var responseModel = {
      date: now.toDateString().substr(4),
      author: req.user.name,
    };

    // save to database
    ideas.create({
      title: req.body.title,
      description: req.body.description,
      date: responseModel.date,
      author: responseModel.author
    }, function(newId){
      responseModel.id = newId;
      res.json(responseModel);
    });
  },

  /*
   * GET idea
   */
  read: function(req, res){
    if (!req.params.id) {
      ideas.getAll(function(ideas){
        res.json(ideas);
      });
    } else {
      ideas.getSingleIdea(req.params.id, function(idea){
        res.json(idea);
      });
    }
  },

  /*
   * PUT idea
   */
  update: function(req, res){

    // for new comments
    if (req.body.newComment){

      // get last comment
      var newComment = req.body.comments[req.body.comments.length - 1];

      var commentTime = new Date();
      newComment.author = req.user.name;
      newComment.time = commentTime.getTime();

      ideas.addComment(req.body.id, newComment, function(idea){
        if (idea == null){
          res.json(500);
        } else {
          res.json(idea);
        }
      });
    } else {
      // for post edits
      console.log(req.body);

      postEdit = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        author: req.user.name
      };

      ideas.editPost(postEdit, function(idea, err){
        if (err) {
          res.json({error: err});
        } else {
          res.json(idea);
        }
      });
    }

  },

  /*
   * PATCH idea
   */

  updatesomething: function(req, res){
    console.log(req.body);
    res.json(200);
  },

  /*
   * DELETE idea
   */
  deletePost: function(req, res){

  }
}

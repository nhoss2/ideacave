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
    if (req.params.length == 0) {
      ideas.getAll(function(ideas){
        res.json(ideas);
      });
    }
  },

  /*
   * PUT idea
   */
  update: function(req, res){

  },

  /*
   * DELETE idea
   */
  deletePost: function(req, res){

  }
}

var jsonfile = require('../jsonfile');

/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(req.user);
  if (!jsonfile.config.installed){
    res.render('installation', {error: req.flash('error')});
  } else {
    res.render('index');
  }
};

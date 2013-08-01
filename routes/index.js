var jsonfile = require('../jsonfile');

/*
 * GET home page.
 */

exports.index = function(req, res){
  if (!jsonfile.config.installed){
    res.render('installation', {error: req.flash('error')});
  } else {
    res.render('index');
  }
};

var jsonConfig = require('../jsonfile');
var passport = require('passport');
var auth = require('../auth');

module.exports = {

  /*
   * POST registration page
   */

  newUser: function(req, res){
    auth.newUser(req.param('username'), req.param('name'), req.param('password'), function(err, user){
      if (err){ 
        return res.send(400, err);
      } 

      // log in user if registration is successful
      req.login(user, function(err){
        if (err) {
          throw err;
        }
        return res.json({name: user.name});
      });
    });
  },

  /*
   * POST new admin user
   * only used when the app is running for the first time and
   * there are no user accounts.
   */

  newAdmin: function(req, res){

    // for now, if there is already an admin account, dont let
    // any new admin accounts get created
    if (jsonConfig.config.installed) return res.redirect('/');

    auth.newUser(req.param('username'), req.param('name'), req.param('password'), function(err, user){
      if (err){
        req.flash('error', err);
        return res.redirect('/');
      }

      req.login(user, function(err){
        if (err) {
          throw err;
        } else {
          // make the new user an admin
          auth.addAttributes(user._id, {admin: true});

          // change the config to say that the installation is done
          jsonConfig.config.installed = true;
          jsonConfig.save()
          return res.redirect('/');
        }
      });
    });
  },

  /*
   * POST login page
   */

  login: function(req, res){
    res.json({name: req.user.name});
  },

  /*
   * GET logout page
   */

  logout: function(req, res){
    req.logout();
    res.redirect('/');
  },

  /*
   * GET list users name
   */
  getName: function(req, res){
    if (req.user){
      res.json({name: req.user.name});
    } else {
      res.json({});
    }
  }


};

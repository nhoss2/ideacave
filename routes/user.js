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
        return res.json({message: 'error'});
      } else {
        // log in user if registration is successful
        req.login(user, function(err){
          if (err) {
            throw err;
          }
          return res.json({message: 'success'});
        });
      }
    });
  },

  /*
   * POST new admin user
   * only used when the app is running for the first time and
   * there are no user accounts.
   */

  newAdmin: function(req, res){
    auth.newUser(req.param('username'), req.param('name'), req.param('password'), function(err, user){
      if (err){
        req.flash('error', err);
        return res.redirect('/');
      } else {
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
      }
    });
  },

  /*
   * POST login page
   */

  login: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),

  /*
   * GET logout page
   */

  logout: function(req, res){
    req.logout();
    res.redirect('/');
  },


};

var auth = require('../auth');
var passport = require('passport');

module.exports = {

  /*
   * GET user registration page.
   */

  getRegister: function(req, res){
   res.render('registration', {error: req.flash('error')});
  },

  /*
   * POST registration page
   */

  newUser: function(req, res){
    auth.newUser(req.param('username'), req.param('password'), function(err, user){
      if (err){ 
        req.flash('error', err);
        return res.redirect('register');
      } else {
        // log in user if registration is successful
        req.login(user, function(err){
          if (err) {
            throw err;
          }
          return res.redirect('/');
        });
      }
    });
  },

  /*
   * GET login page
   */

  getLogin: function(req, res){
   res.render('login', {error: req.flash('error')});
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

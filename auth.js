var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var NeDB = require('nedb');
var scrypt = require('scrypt');
var check = require('validator').check;
var sanitize = require('validator').sanitize;

// set up local strategy 
passport.use(new LocalStrategy(function(email, pass, done){
  find({email: email}, function(login){

    if (!login){
      done(null, false, {message: 'incorrect username or password'});
    } else {
      scrypt.verifyHash(login.password, pass, function(err, result){
        if (result){
          done(null, login);
        } else {
          done(null, false, {message: 'incorrect username or password'});
        }
      });
    }

  });
}));

var database = new NeDB({
  filename: __dirname + '/database/users.db',
  autoload: true
});

var find = function(search, callback){
  database.findOne(search, function(err, doc){
    if (err) throw err;
    callback(doc);
  });
};

passport.serializeUser(function(user, done){
  return done(null, user._id);
});

passport.deserializeUser(function(id, done){
  find({_id: id}, function(user){
    if (user) return done(null, user);
    else return done(null, false);
  });
});

module.exports = {

  // callback function takes two inputs:
  //   - a string if there is an error, or null.
  //   - the user object if registration successful
  newUser: function(email, name, password, callback){

    // check if valid email
    try{
      check(email, 'Please enter valid email').isEmail();
    } catch (err) {
      return callback(err.message);
    }

    // make sure password is at least 6 characters
    try{
      check(password, 'Password needs to be a minimum of 6 characters').len(6, 1000);
    } catch (err) {
      return callback(err.message);
    }

    // check for name
    try{
      check(name, 'Please enter name').len(1);
    } catch (err) {
      return callback(err.message);
    }

    // check if user exists already
    find({email: email}, function(user){
      if (user) {
        return callback('User with this email address already exists');
      } else {
        // create password hash and save new user into database
        scrypt.passwordHash(password, 0.1, function(err, hash){
          if (err) throw err;

          database.insert({
            email: email,
            password: hash,
            name: sanitize(name).xss()
          }, function(err, newDoc){
            if (err) {
              throw err;
            } else {
              return callback(null, newDoc);
            }
          });

        });
      }
    });

  },

  // add an attribute to a user, like giving them admin
  addAttributes: function(userId, attribute){
    database.update({_id: userId}, {$set: attribute}, {}, function(err){
      if (err) throw err;
    });
  },

  // middleware for pages which need user to be logged in
  ensureAuthenticated: function(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    return res.redirect('/login');
  }
}

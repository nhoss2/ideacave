var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');

var auth = require('./auth');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
require('crypto').randomBytes(64, function(err, buf) {
  if (err) throw err;
  app.use(express.cookieParser(buf.toString('hex')));
  app.use(express.session());
});
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/register', user.getRegister);
app.post('/register', user.newUser);
app.get('/login', user.getLogin);
app.post('/login', user.login);
app.get('/logout', user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

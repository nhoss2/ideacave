var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var user = require('./routes/user');
var passport = require('passport');
var flash = require('connect-flash');

var auth = require('./auth');
var jsonfile = require('./jsonfile');
jsonfile.init();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(require('crypto').randomBytes(64).toString('hex')));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// make HJS tempates not use {{ }} as their delimeters and
// instead use <% %>
app.locals.delimiters = '<% %>';

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/register', user.newUser);
app.post('/registerAdmin', user.newAdmin);
app.post('/login', user.login);
app.get('/logout', user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var user = require('./routes/user');
var posts = require('./routes/posts');
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

// redirect all 404s to '/'
app.use(function(req, res, next){
  res.render('index');
});

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
app.post('/login', passport.authenticate('local'), user.login);
app.get('/logout', user.logout);
app.get('/api/currentuser', user.getName);

app.post('/api/ideas', auth.ensureAuthenticated, posts.create);
app.get('/api/ideas', posts.read);
app.get('/api/ideas/:id', posts.read);
app.put('/api/ideas/:id', posts.update);
app.del('/api/ideas/:id', posts.deletePost);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

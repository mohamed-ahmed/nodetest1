
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

// Mongodb
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');  

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/helloworld', routes.helloworld);
app.get('/userlist', routes.userlist(db));
app.get('/newuser', routes.newuser);

//post
app.post('/adduser', routes.adduser(db));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

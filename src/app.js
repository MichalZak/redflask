var express = require('express'),
    app = express(),
    nunjucks = require('nunjucks'),
    path = require('path'),
    logger = require('morgan'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    PouchDB = require('pouchdb'),
    bodyParser = require('body-parser');

var SuperLogin = require('superlogin');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//setup pouch server
app.use(cors({credentials: true, origin: 'http://localhost:8101'}));

//auth superlogin
if (process.env.NODE_ENV == 'production')
    var config = require('./config.production');
else
    var config = require('./config');

var superlogin = new SuperLogin(config);
app.use('/auth', superlogin.router);


//setup view folder
app.set('views', path.join(__dirname, '../views')); 

// set the view engine to nunjucks
nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app
});

//static files
app.use('/' ,express.static('public'));


//setup index 
var routes = require('./routes/index');
app.use('/', routes);









/* Use this is production
//catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    res.status = 404;
    next(err);
});

// no stackraces leaked to user
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('404.html')
});
*/

module.exports = app;

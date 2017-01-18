var express = require('express'),
    app     = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    logger  = require('morgan'),
    port    = process.env.PORT || 3000,
//    PouchDB = require('pouchdb'),
    SuperLogin = require('superlogin');

const config = {
    security: {
        loginOnRegistration:true,
        sessionLife: 60*60*24*30
    },
  

    dbServer: {
        protocol: 'http://',
        host: 'localhost:3001/',
        user: 'mike',
        password: 'pass',
        userDB: 'sl-users',
        couchAuthDB: '_users'
    },

    userDBs: {
        defaultDBs: {
            private: ['redflask']
        }
    }
  
};


var auth = require('./auth');
var blog = require('./blog');

//logging
app.use(logger('dev'));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));


// Initialize SuperLogin
//var superlogin = new SuperLogin(config);

// Mount SuperLogin's routes to our app
//app.use('/auth', superlogin.router);


app.listen(port);
console.log('listening on port '+port);
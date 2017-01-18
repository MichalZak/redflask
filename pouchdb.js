var express = require('express'),
    app     = express(),
    router = express.Router(),
    port    = process.env.PORT || 3001,
    cors = require('cors'),
    logger = require('morgan'),
    SuperLogin = require('superlogin'),
    PouchDB = require('pouchdb');

var auth = require('./src/auth');

//logging
app.use(logger('dev'));


//setup pouch server
app.use(cors({credentials: true, origin: 'http://localhost:8101'}));

//setup auth-router
app.use('/authtest', auth);



var pouch= PouchDB.defaults({prefix: './db/1/'});
app.use('/', require('express-pouchdb')(pouch));


app.listen(port);
console.log('listening on port '+port);
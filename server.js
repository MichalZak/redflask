#!/usr/bin/env node

var app = require('./src/app');

app.set('port', process.env.PORT || 3000);

//start server
app.listen(app.get('port'), function() {
    console.log('Server started on port: ', app.get('port'))
});

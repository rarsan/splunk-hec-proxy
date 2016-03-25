var app = require('express')();
var request = require('request');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');

var HTTP_PORT = 8090,
    HTTPS_PORT = 4443;
//    SSL_OPTS = {
//      key: fs.readFileSync(path.resolve(__dirname,'.ssl/www.example.com.key')),
//      cert: fs.readFileSync(path.resolve(__dirname,'.ssl/www.example.com.cert'))
//    };

require('request').debug = true

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/services/collector/event', function(req, res) {
  var token = req.query.tokenid;
  delete req.query.tokenid;

  console.log(req.body);
  var body = req.body;
  if (req.is('application/x-www-form-urlencoded')) {
    body = JSON.parse(Object.keys(req.body)[0]);
  }
  console.log(body);

  req.pipe(request({
    url: req.protocol + '://' + 'splunktest1.westus.cloudapp.azure.com' + ':8088' +  req.baseUrl,
    qs: req.query,
    headers: {
      'Authorization': 'Splunk ' + token
    },
    body: JSON.stringify({
      'event': body
    })
  })).pipe(res);
});

var pidFile = path.resolve(__dirname, './pid.txt');
fs.writeFileSync(pidFile, process.pid, 'utf-8'); 

// Create an HTTP service.
http.createServer(app).listen(HTTP_PORT,function() {
  console.log('Listening to HTTP on port ' + HTTP_PORT);
});

// Create an HTTPS service identical to the HTTP service.
//https.createServer(SSL_OPTS, app).listen(HTTPS_PORT,function() {
//  console.log('Listening to HTTPS on port ' + HTTPS_PORT);
//});


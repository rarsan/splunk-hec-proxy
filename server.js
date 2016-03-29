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

//require('request').debug = true

app.use(bodyParser.json()); // for parsing application/json

app.use('/services/collector', function(req, res) {
  var hec_token = req.query.hec_token,
      hec_host = req.query.hec_host;
  delete req.query.hec_token;
  delete req.query.hec_host;

  if (!hec_token || !hec_host) {
    return res.status(400).json({
      error: 'Missing hec_token or hec_host query params'
    });
  }

  request({
    url: req.protocol + '://' + hec_host + req.baseUrl,
    method: req.method,
    qs: req.query,
    headers: {
      'Authorization': 'Splunk ' + hec_token
    },
    body: JSON.stringify({
      'event': req.body
    })
  }).on('error', function(error) {
    console.log("pipe failed: ", error);
    res.status(500).json({
      error: error
    });
  }).pipe(res);
});

var pidFile = path.resolve(__dirname, './pid.txt');
fs.writeFileSync(pidFile, process.pid, 'utf-8'); 

// Create an HTTP service.
var port = process.env.PORT || HTTP_PORT;
http.createServer(app).listen(port, function() {
  console.log('Listening to HTTP on port ' + port);
});

// Create an HTTPS service identical to the HTTP service.
//https.createServer(SSL_OPTS, app).listen(HTTPS_PORT,function() {
//  console.log('Listening to HTTPS on port ' + HTTPS_PORT);
//});


var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//Config
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//Routers
app.get('/', function(request, response) {
  response.sendFile('public/index.html');
});

//Init
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
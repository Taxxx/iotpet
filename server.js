// set up ======================================================================
var express  = require('express.io');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 3000; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var dgram = require('dgram');
var arduino_server = dgram.createSocket("udp4");
var fs = require('fs');

app.http().io();

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes/home.js')(app);



var crlf = new Buffer(2);
  crlf[0] = 0xD; //CR - Carriage return character
  crlf[1] = 0xA; //LF - Line feed character

function getDateTime() {

var date = new Date();

var hour = date.getHours();
hour = (hour < 10 ? "0" : "") + hour;

var min  = date.getMinutes();
min = (min < 10 ? "0" : "") + min;

var sec  = date.getSeconds();
sec = (sec < 10 ? "0" : "") + sec;

var year = date.getFullYear();

var month = date.getMonth() + 1;
month = (month < 10 ? "0" : "") + month;

var day  = date.getDate();
day = (day < 10 ? "0" : "") + day;

return year + "/" + month + "/" + day + " " + hour + ":" + min + ", ";

}



arduino_server.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  arduino_server.close();
});

arduino_server.on("message", function (msg, rinfo) {
	var arduinoArray = msg.toString().split(',');
	var arduinoJson = {};
	arduinoJson.temperatura = arduinoArray[0];

	//x=msg;
	//debugger;
 // console.log(getDateTime() + msg + " from " +
 // rinfo.address + ":" + rinfo.port);
 // fs.appendFile("mydata.txt",getDateTime() + msg + crlf, encoding='utf8',function(err){});//write the value to file and add CRLF for line break
 console.log(msg + " from " +
 rinfo.address + ":" + rinfo.port);
 fs.appendFile("mydata.txt",getDateTime() + msg + crlf, encoding='utf8',function(err){});//write the value to file and add CRLF for line break

//Actualiza Datos
app.io.broadcast('data_arduino', arduinoJson);

});

//Socket_Arduino
arduino_server.on("listening", function() {
    var address = arduino_server.address();
    console.log("server listening " + address.address + ":" + address.port);
});

arduino_server.bind(6000); //listen to udp traffic on port 6000


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
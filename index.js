// Import our projects
var express = require('express');
var app = express();
var http = require('http').Server(app);
// require tells our porgram to go get the packages 'package' and allow our program to user.

//Serve up our static files
app.use(express.static(__dirname+'/public'));
//We are telling our app to use the static folder (public) that express prepares for us.

//Serve up our index.html file
app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

// Run on a local port
http.listen(process.env.PORT || 3000, function(){
	console.log("listening on *:3000");
});

// go to terminal and tell it: node index.js
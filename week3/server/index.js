/*
console.log('Hello World!');
const http = require("http"); //Require is JS version of "importing" something 

const server = http.createServer('/', function(req, res) {  //(file path, func(handle the request, return the response))

})

server.listen(3000) //("hit" port number)
*/


const express = require("express"); //express is an API (serves-up websites)
const app = express(); //express needs to be initialized //most npm packages come with a read me on how to use it //developers choise

/*          MIDDLEWARE          */

app.use(express.static('public')); //express pulls static directory('public') //serve our website

//app.use('/css', express.static(__dirname + '/public/css')); //http://localhost:300/css //any requests that are made to a css directory, serve up these static files at the complete path of where we are runnning the script from
//app.use('/src', express.static(__dirname + '/public/src'));
//app.use('/src/media', express.static(__dirname + '/public/src/media'));

app.listen(3000, function() { //(portnumber, callback()) //at port 3000, exectute func()
    console.log("Server started at http://localhost:%s", 3000);
}); 

/*             ---             */


/**
 * TO Start Server
 * CMD line 
 * - cd
 * - node server/index.js
 * 
 * To quit server
 * CMD Line 
 * - "ctrl" C
 */
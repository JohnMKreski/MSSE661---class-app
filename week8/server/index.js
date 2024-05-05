const express = require("express"); //express is an API (serves-up websites)
var fs = require('fs');
var https = require('https');
const app = express(); //express needs to be initialized //most npm packages come with a read me on how to use it //developers choise

const httpPort = process.env.PORT || 4000;
const httpsPort = process.env.HTTPS_PORT || 4443;

/*          MIDDLEWARE          */

app.use(express.static('public')); //express pulls static directory('public') //serve our website

//http://localhost:4000/css //any requests that are made to a css directory, serve up these static files 
//at the complete path of where we are runnning the script from
//DOnt need *below* because of performance issues
// app.use('/css', express.static(__dirname + '/public/src/css')); 
// app.use('/src', express.static(__dirname + '/public/src'));
// app.use('./js', express.static(__dirname + '/public/src/js'));

//(portnumber, callback()) //at port 3000, exectute func()
app.listen(httpPort, () => {
    console.log('Server started at http://localhost:%s', httpPort);
  });
  
  https
    .createServer(
      {
        key: fs.readFileSync(__dirname + '/server.key'),
        cert: fs.readFileSync(__dirname + '/server.cert'),
      },
      app
    )
    .listen(httpsPort, () => {
      console.log('Server started at https://localhost:%s', httpsPort);
    });

/*             ---             */



/**
 * TO Start Server
 * CMD line 
 * - cd
 * - npm start
 * 
 * To quit server
 * CMD Line 
 * - "ctrl" C
 */
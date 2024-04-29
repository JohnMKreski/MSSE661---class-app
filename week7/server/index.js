const express = require("express"); //express is an API (serves-up websites)
const app = express(); //express needs to be initialized //most npm packages come with a read me on how to use it //developers choise

const port = process.env.PORT || 4000; //Backend is running on 3000, dont want them to conflict

/*          MIDDLEWARE          */

app.use(express.static('public')); //express pulls static directory('public') //serve our website

//http://localhost:4000/css //any requests that are made to a css directory, serve up these static files 
//at the complete path of where we are runnning the script from
//DOnt need \/ because of performance issues
// app.use('/css', express.static(__dirname + '/public/src/css')); 
// app.use('/src', express.static(__dirname + '/public/src'));
// app.use('./js', express.static(__dirname + '/public/src/js'));

//(portnumber, callback()) //at port 3000, exectute func()
app.listen(port, function() { 
    console.log("Server started at http://localhost:%s", port);
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
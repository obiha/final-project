const express = require('express');
const app     = express();
const PORT    = 3000;
const path    = require('path');
const pug     = require('pug');


const model   = require("./public/movie-logic-module.js");


app.use(express.json());

const session = require('express-session');
app.use(session({ secret: 'some secret here'}))
app.use(express.urlencoded({extended: true}));


const requestingPerson = model.movies[""];

//function used to print user requests to the console
let printRequest = function(request, response,next){
    console.log("\nLOGGED")
    console.log(request.url);
    console.log(request.path);
    console.log(request.params);
    console.log(request.session);
    console.log(request.printRequest = Date.now());
    next();
}

app.use(express.static('public'));

//allows for the server to use the printRequest function on line-18* 
app.use(printRequest);


app.get('/', function(request, response, next) {
    response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/404', function(request, response, next){
    response.sendFile(path.join(__dirname + '/public/error.html'));
})

//the things needed for pug to work in express
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/public"));

app.get('/signin', function(request, response, next) {

    response.sendFile(path.join(__dirname + '/public/login.html'));
    console.log(request.session);
   
    console.log("Request from user: " + request.session.username);
    

     //the page is rendered using pug eventually 
    // response.render("login");
    
});

app.post('/login', function(request, response, next){
    console.log("Username: " + request.body.username);
    console.log("Password: " + request.body.password);

    if(model.authenticateUser(request.body.username, request.body.password)){
        console.log("User Exists");    
        request.session.user = model.users[request.body.username];
        response.redirect("/users/" + request.body.username);
    }else{
        console.log("Invalid/undefined");
        response.send("Invalid/Undefined");
        response.sendFile(path.join(__dirname + '/public/index.html'));
    }
});


app.post('/signup', function(request, response, next){
    console.log("Username: " + request.body.username);
    console.log("Password: " + request.body.password);


    if(model.authenticateNewUser(request.body.username)){
        console.log("User Exists - use another name");    

    }else{
        newuser = model.createUser({username: request.body.username, password: request.body.password , usertype: "regular"});
        
        if(model.authenticateUser(request.body.username, request.body.password)){
            console.log("User Exists");    
    
            request.session.user = model.users[request.body.username];
            response.redirect("/users/" + request.body.username);
        }else{
            console.log("Invalid/undefined");
            response.sendFile(path.join(__dirname + '/public/error.html'));
        }
    }
});

app.get('/stylesheet' , function(request, response, next) {
    response.sendFile((__dirname + '/public/stylesheet.css')); 
});

app.get('/logic', function(request, response, next) {    
    response.sendFile((__dirname + '/public/movie-logic-module.js'));
});

app.get('/dom', function(request, response, next) {
    response.sendFile((__dirname + '/public/domscript.js'));
});

app.get("/moviedata", function(request, response, next) {
    response.sendFile((__dirname + '/public/movie-data.json'));
});

app.get('/users', function(request, response, next) {
    // response.sendFile((__dirname + '/public/users.json'));
    let result = model.searchUsers(request.session.user, request.query.name);
    response.status(200).json(result);
});

app.get("/users/:user", function(request, response, next) {
    let result = model.getUser(request.session.user, request.params.user);
    let myObj = "";

    if(result == null){
        response.status(404).send("Unknown user");
        console.log("Yeah I couldnt get the user info even though they exist");
        console.log(`${result}`);
    }else{
        // response.status(200).json(result);
        // myObj = JSON.parse(result);
        // response.send("Hello" + JSON.stringify(result.username));
        response.sendFile(path.join(__dirname + '/public/userpage.html'));
        // response.redirect("/people" + request.body.username);

    }
});

app.get("/movies", function(request, response, next) {
    let movie = request.query;
    console.log("This is movies tuff: " + (typeof  movie.name));

    if((typeof movie.name) == 'undefined'){
        response.sendFile((__dirname + '/public/movies.html'));  
    }else{
        let temp = model.searchMovies(`${movie.name}`);
        response.send(`<html><body>

        ${temp.map(function(result) {
            return `<div style=""class="movie-shelf"> 
            <div  style="  margin: 70px; " class="movie-div">
            <img "class="movie-poster" src="${result.Poster}" width="190" height="300">
            <h2>${result.Title} - ${result.Rated}</h2>
            <p>${result.Genre}  - ${result.Released}</p>
            <p>${result.Actors} - ${result.Language}</p>
            <p>${result.Language}  - ${result.Writer}</p>
            <p>${result.Director}  - ${result.Awards}</p>
            <p>${result.Country}  - ${result.Released}</p>
            <h3>${result.Ratings[0].Source}</h3>
            <p>${result.Ratings[0].Value}</p>
            </div></div>`
        }).join('')}

        

        </body></html>`);
        // console.log(`${result}`);
    }



      
    // console.log("Username: " + request.body.username);
    // let result = model.listMovies();
    // response.send(result);
});

app.get("/people", function(request, response, next) {

    let actor = request.query;

    if((typeof actor.name) == 'undefined'){
        response.sendFile((__dirname + '/public/people.html'));  
    }else{

    // let movie = request.query;
    // let result = model.searchMovies(`${movie.name}`);
    // console.log(result);

    
    // let result = model.searchPerson(`${person.name}`);

    // response.send(result);

    let temp = model.searchPerson(`${actor.Actors}`);
        response.send(`<html><body>

        ${temp.map(function(result) {
            return `<div style=""class="movie-shelf"> 
            <div  style="  margin: 70px; " class="movie-div">
            <img "class="movie-poster" src="${result.Poster}" width="190" height="300">
            <h2>${result.Title} - ${result.Rated}</h2>
            <p>${result.Actors} - ${result.Language}</p>
            <p>${result.Language}  - ${result.Writer}</p>
            <p>${result.Director}  - ${result.Awards}</p>
            <p>${result.Country}  - ${result.Released}</p>
            
            </div></div>`
        }).join('')}
        </body></html>`);


    }
    // response.sendFile((__dirname + '/public/people.html'));  
});

app.get("/people/:person", function(request, response, next) {
    response.send("GET PEOPLE AND THAT");
});








app.listen(PORT, () => console.log("SERVER LISTENING ON PORT: " + PORT + "\n" + "http://localhost:3000"));



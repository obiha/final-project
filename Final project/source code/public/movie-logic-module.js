let users = require('./users.json');
let movies = require('./movie-data.json');
const { title } = require('process');
const { fstat } = require('fs');
const fs = require('fs');


//Returns a List of all movies in the movie-database
for(mid in movies){
    let movie = movies[mid];
    console.log(movie.Title);
}

function isValidMovie(movieObj){
    if(!movieObj){
        return false;
    }
    if(!movieObj.title || !movies.hasOwnProperty(movieObj.Title)){
        return false;
    }
    console.log("true");
    return true;
}




function isValidUser(userObj){
    if(!userObj){
        return false;
    }
    if(!userObj.username || !users.hasOwnProperty(userObj.username)){
        return false;
    }
    console.log("true");
    return true;
}


function authenticateUser(username, password){
    return users.hasOwnProperty(username) && users[username].password == password;
}

function authenticateNewUser(username){
    return users.hasOwnProperty(username);
}


function createUser(newUser){
    if(!newUser.username || !newUser.password){
        console.log('user not recognized');
        console.log(newUser.username);
        console.log(newUser.password);

        return null;
    }

    if(users.hasOwnProperty(newUser.username)){
        return null;
    }

    newUser.watchList_created = [];
    newUser.ratingList_created = [];
    newUser.friendList= [];
    newUser.usertype = "";
    newUser.favegenre = "";

    users[newUser.username] = newUser;


   fs.writeFile('./users.json', JSON.stringify(users), function writeJSON(err){
       if(err) return console.log(err);
       console.log(JSON.stringify(users));
       console.log('writing to file');
   });


    console.log(users);




    console.log(`USER ${newUser.username} CREATED`);

    



    return users[newUser.username];

}

function getUser(requestingUser, userID){

    console.log("This is the getUser function. Requesting user: " + requestingUser.username + "\nUSERID: " + userID);
    if(!isValidUser(requestingUser)){
        console.log("isValid - null");
        return null;
    }

    if(users.hasOwnProperty(userID)){
        if(requestingUser.username == userID || requestingUser.friends.includes(userID)){
            console.log("Users List: " + users[userID]);
            console.log(users[userID].username);
            console.log(users[userID].watchList_created);
            console.log(users[userID].ratingList_created);
            return users[userID];
        }
    }
    console.log("getUser - null");
    return null;
}

function searchUsers(requestingUser, searchTerm){
    console.log("This is the search function");
    let results = [];


    if(!isValidUser(requestingUser)){
    
        return results;
    }

    for(username in users){
        let user = users[username];
        console.log("THis is where I am");
        console.log(`${user.username}`);
        console.log(`${searchTerm}`);

        // if(user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0){
        //     if(user.username === requestingUser.username || requestingUser.friendList.includes(user.username)){
        //         results.push(user);
        //       }
        // }
    }
    return results;
}

function getMovie(requestingMovie, movieID){
    console.log("This is the getMovie function. Requesting Movie: " + requestingMovie.Title + "\nMOVIEID: " + movieID);
    if(!isValidMovie(requestingMovie)){
        console.log("isValid - null");
        return null;
    }

    if(movies.hasOwnProperty(movieID)){
        if(requestingMovie.Title == movieID){
            console.log("Movie List: " + movie[movieID]);
            console.log(movie[movieID].Title);
            console.log(movie[movieID].Year);
            console.log(movie[movieID].Country);
            return movies[movieID];
        }
    }
    console.log("getMovie - null");
    return null;
}

function listMovies(){
    
    let results = [];

    let movie = movies[Title];
    
    for(let i = 0; i < movies.length; i++){
        

        results.push(movie);
    }



return results;

}

function searchMovies(searchTerm){
    console.log("This is the movie search function");
    let results = [];
    for(Title in movies){
        
        let movie = movies[Title];
        if(movie.Title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0){
            if(movie.Title === searchTerm ){
                results.push(movie);
              }
        }
    }
    return results;
}



function searchPerson(searchTerm){
    let results = [];

    for(Actors in movies){
        let movie = movies[Actors];
        
        if(movie.Actors.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            if(movie.Actors == searchTerm ){
                console.log(`${movie.Title}`);
                result.push(movie);
            }
        }

        results.push(movie.Actors);


        // if(movie.Actors.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0){
        //     if(movie.Title === searchTerm ){
        //         results.push(movie);
        //       }
        // }
    }
    return results;
}
    

function generateRecommended(){



}

// function getFeaturedMovie(){
//     console.log("Featured Movie gets returned");

//     let result = [];

//     for(Title in movies){
//         let movie = movies[Title];
//         if(movie.Ratings.values)
//     }
// }




console.log("Creating user");

let userA = createUser({username: "aristotle", password: "iamsmrt" , usertype: "regular"});
let userB = createUser({username: "norm", password: "norm", usertype: "contributing"});

console.log("Newly Created User");
console.log(userA);
console.log(userB);


console.log("User Search");

//make Friends has not been implemented Giving the current Users search for the other user returning an empty 
//array 

//Searches for Toy Story
let movieResult = searchMovies("Toy Story");
console.log(movieResult);

let result = searchUsers(userA, "norm");
console.log(result);


module.exports = {
    users,
    movies,
    isValidUser,
    authenticateNewUser,
    authenticateUser,
    createUser,
    getUser,
    searchUsers,
    isValidMovie,
    searchMovies,
    searchPerson,
    getMovie,
    listMovies
}
let movies = [];
let users  = [];

fetch('../movie-data.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(moviedata){
        movies = moviedata;
        document.getElementById("movieview").innerHTML = `${moviedata.map(function(movie) {
                                                              return `<div style=""class="movie-shelf"> 
                                                              <div  style="  margin: 70px; " class="movie-div">
                                                              <img "class="movie-poster" src="${movie.Poster}" width="190" height="300">
                                                              <h2>${movie.Title} - ${movie.Rated}</h2>
                                                              <p>${movie.Genre} - ${movie.Released}</p>
                                                          </div></div>`
                                                          }).join('')}`;
});
    
function getAccountMovies(){location.href = "http://localhost:3000/movies";} 

function getAccountPeople(){location.href = "http://localhost:3000/people";}

function performMovieSearch () {
    let keyedValue = document.getElementById("search").value;
    location.href = `http://localhost:3000/movies?name=${keyedValue}`;
}

function getAccountWatchlist(){
    console.log(movies);
}

// function getAccountFriends(){}

// function getAccountSettings(){}

function logoutAccount(){location.href = "http://localhost:3000";}

function createAccount(){
    const createAccountView = " <div class='signupview'><form action='/signup' method='post'><label for='username'> \
                                Username:</label><input class='logininuser' type='text' \
                                name='username' placeholder='choose a unique username' required><br><label for='password''>\
                                 Password:</label><input class='logininpass' type='password' name='password' \
                                 required><br><button class='loginbutton'type='submit'>Signup</button></form></div>";
    
    document.getElementById("loginview").innerHTML = createAccountView; } 
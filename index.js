//imports express module locally
const express = require("express");
const morgan = require("morgan");
//declared variable to encapsulate express's functionality for server
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");

app.use(morgan("common"));
app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Jorge",
    favoriteMovies: [],
  },
];

let topMovies = [
  {
    title: '12 Angry Men',
    director: {
    name:'Sidney Lumet'
    },
    genre: {
      name:'drama',
  }},
  {
    title: 'The lives of others',
    director: {
    name:'florian henckel von donnersmarck'
    },
    genre: {
      name:'drama',
  }},
  {
    title: 'Psycho',
    director: {
      name:'Alfred Hitchcock'
    },
    genre: {
      name:'drama',
  }},
  {
    title: 'Requiem for a Dream',
    director: {
    name:'Darren Aronofsky'
  },
    genre: {
      name:'drama',
  }},
  {
    title: 'Phantum Thread',
    director: {
    name:'Paul Thomas Anderson'
    },
    genre: {
      name:'drama',
  }},
  {
    title: 'Mulholland Drive',
    director: {
      name:'David Lynch'
    },
    genre: {
      name:'drama',
  }},
  {
    title: 'Leon',
    director: {
    name:'Luc Besson'
    },
    genre: {
      name:'drama',
  }},
  {
    title: 'Schindlers List',
    director: {
      name:'Steven Spielberg'
    },
    genre: {
      name:'drama',
  }},
  {
    title: 'Indicent Proposal',
    director: {
      name:'Adrian Lyne'
    },
    genre: {
      name:'drama',
  }},
  {
    title: 'A clockwork Orange',
    director: {
      name:'Stanley Kubrik'
    },
    genre: {
      name:'krimi',
  }},
];


//CREATE

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

//UPDATE

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

let user = users.find( user => user.id == id )

if (user) {
  user.name = updatedUser.name;
  res.status(200).json(user);
} else {
  res.status(400).send('no such user')
}
});

//CREATE

app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELET

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELET

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});


// GET requests

app.get('/', (req, res) => {
  res.send('Welcome to my Movie channel');
});

// Gets the list of all movies to the user

app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
});


// Gets the data about a single movie, by name

app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find(movie => movie.title === title)

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }
})

// Gets the data about a genre of movie

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = topMovies.find(movie => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such movie')
  }
})

// Gets the data about director of movie

app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = topMovies.find(movie => movie.director.name === directorName);

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such movie')
  }
})

//read documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});
//Serving Static Files via express 
//automatically route  request to send back resp with static public
// HERE documentation.html
// or app.use('/', express.static('public')); so can be customize

//Static File  
app.use(express.static('public')); 

//Error Handling
app.use((err, req, res, next) => {
console.error(err.stack); 
res.status(500).send('Something broke!');
});

//Listen for request
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
const express = require("express");
      morgan = require('morgan');
const app = express();

app.use(morgan('common'));

// GET requests

app.get('/movies', (req, res) => {
    res.json(topmovies);
});
app.get('/', (req, res) => {
    res.send('Welcome to my Movie channel');
});

let topmovies = [
    {
        title: '12 Angry Men',
        director: 'Sidney Lumet'
    },
    {
        title: 'The lives of others',
        director: 'florian henckel von donnersmarck'
    },
    {
        title: 'Psycho',
        director: 'Alfred Hitchcock'
    },
    {
        title: 'Requiem for a Dream',
        director: 'Darren Aronofsky'
    },
    {
        title: 'Phantm Thread',
        director: 'Paul Thomas Anderson'
    },
    {
        title: 'Mulholland Drive',
        director: 'David Lynch'
    },
    {
        title: 'Leon',
        director: 'Luc Besson'
    },
    {
        title: 'Schindlers List',
        director: 'Steven Spielberg'
    },
    {
        title: 'Indicent Proposal',
        director: 'Adrian Lyne'
    },
    {
        title: 'A clockwork Orange',
        director: 'Stanley Kubrik'
    },
];

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
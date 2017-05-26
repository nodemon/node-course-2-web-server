const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set ('view engine', 'hbs');
// app.set('views', './otherfolder');
app.use(express.static(__dirname + '/public'));


// This helper can be referenced just like variables
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
// helper with a param
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// express middleware
app.use((req, res, next) => {
  var now = new Date();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err) => {
    if (err) {
      console.log ('Unable to append to server log');
    }
  });
  next(); // to continue with other request handler
});


app.get('/data', (req, res) => {
  // res.send('hello express');
  //setTimeout (sendData(res), 5000);
  var reqTime = new Date();
  setTimeout (() => {
    var resTime = new Date();
    res.send({
      name: 'Nikhil',
      city : 'mississauga',
      requestAt: `${reqTime}`,
      responseAt: `${resTime}`
    });
  }, 5000);
});

app.get('/', (req, res) => {
  // render template using view engine: default directory - views
  res.render ('home.hbs', {  // second param: object
    pageTitle: 'Home page',
    welcomeMessage: 'hello'
  });
})

app.get('/about', (req, res) => {
  // render template using view engine: default directory - views
  res.render ('about.hbs', {  // second param: object
    pageTitle: 'About page'
  });
})



// sercond param is a function which runs after listener starts
app.listen(port, ()=> {
  console.log(`server up on port ${port}`);
});

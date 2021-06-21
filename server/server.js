const express = require('express');
const app = express();


app.listen(5000, function(err){
  if(err) console.log(err);
});

app.get('/', function (req, res) {
  res.send('GET request to homepage')
})

app.get('/contact', function (req, res) {
  res.send('Hi there, here is my <a href="mailto:nabil@eceubc.ca"> email </a>')
})

const express = require('express');
const app = express();
const https = require('https');

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
  extended: true
}));

const apikey = "b660f3402c54cb9a9c48f89c35249e5c";


app.listen(5000, function(err){
  if(err) console.log(err);
});

// Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req, res) {
  // res.send("post req received" + req.body.cityName);
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&units=metric&appid=" + apikey

  https.get(url, function(https_res) {
    https_res.on("data", function(data) {
      res.write("<h1> " + req.body.cityName + " weather is " + JSON.parse(data).weather[0].description) + "</h1>";
      res.write("<h1> " + req.body.cityName + " temp is " + JSON.parse(data).main.temp) + "</h1>";

      // console.log(JSON.parse(data).weather[0].icon );
      res.write('  <img src="' + "http://openweathermap.org/img/wn/" + JSON.parse(data).weather[0].icon + '.png"' + "/>");
      res.send();
    })
  });

})


app.get('/contact', function (req, res) {
  res.send('Hi there, here is my <a href="mailto:nabil@eceubc.ca"> email </a>')
})

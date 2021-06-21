MERN Demo using (MongoDB, Express.js, React.js, and Node.js)
Here is a list of steps we are going through this demo:
- [ ] Setting up the server
- [ ] Routing in Express
- [ ] REST API
- [ ] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley

---

# Setting up the server
- Create a `server` folder using the command:
    `nabil828@DESKTOP-0AB0QNR:~/mern_demo$ mkdir server`. Now, Express.js is the framework that we will use to build the server. It is defined as
  >Fast, unopinionated, minimalist web framework for Node.js

- [[Source]](https://expressjs.com/en/starter/installing.html) Install Express using the following commands:
```
nabil828@DESKTOP-0AB0QNR:~/mern_demo/server$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (server)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author: NAbil
license: (ISC)
About to write to /home/nabil828/mern_demo/server/package.json:

{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "NAbil",
  "license": "ISC"
}


Is this OK? (yes)
nabil828@DESKTOP-0AB0QNR:~/mern_demo/server$ npm install express --save
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN server@1.0.0 No description
npm WARN server@1.0.0 No repository field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 50 packages in 4.488s
found 0 vulnerabilities
```
- Open the server folder using atom `atom ~/mern_demo/server` and create a new file `server.js`

- change the entry point to `server.js` in the `package.josn` file. This the home page of the server when it the http://localhost:port url s requested.  

- [[Source]](https://expressjs.com/en/5x/api.html#express) Create an Express.js application by copying these two line
```
const express = require('express')
const app = express()
```
into your server.js .

- [[Source]](https://expressjs.com/en/5x/api.html#app.listen) Assign port 5000 to the server using the following code:
```
app.listen(5000)
```
**OR** even better, add a call back function as a second argument to the previous `listen` function so we can print out any errors on the run time:
```
app.listen(5000, function(err){
  if(err) console.log(err);
  })
```

- start the server by typing `$node server.js`
**OR** even better, use `$nodemon server.js` to keep the server running while you are making edits. To install, run `npm install -g nodemon`.

- Test the server by visiting `http://localhost:5000` in your browser.
You should get the following output:
![server running](images/1.jpg)  
We will fix the server to accept get request soon 😉.

- You may now add a handle for GET requests:
```
app.get('/', function (req, res) {
  res.send('GET request to homepage')
})
```
The first argument is the relative path to server homepage.
The second arument is a call function the will hold the `req` variable for the request object. And the `res` variable for the response object. we use the method `res.send()` to send a message back to the client:
![server sending welcome message](images/2.jpg)  
You may even embed HTML in your response's string.

# Routing in Express
So far we had one route to our server. Namely, the '/' route. If we want clients to visit other ~~pages~~ routes, we can handle these requests in such a way:
```
app.get('/contact', function (req, res) {
  res.send('Hi there, here is my <a href="mailto:nabil@eceubc.ca"> email </a>.')
})
```
Output:
![server replying to another route](images/3.jpg)  

# REST API
> [[Source]](https://rapidapi.com/blog/most-popular-api/) API stands for Application Programming Interface and allows your application to interact with an external service using a simple set of commands.

out of 10,000 APIs out there in the wild, we will be interacting with the [[openweathermap]](https://openweathermap.org/api) API to get weather and weather forecasts for multiple cities. Our Express server will act as client in this interaction.
- Create a free account on [[openwathermap]](https://openweathermap.org/price) website.
- [[API call guide]](https://openweathermap.org/current) Using your API key, test an API call by pasting this link into the browser, replacing the API key with yours:
```
api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```
![an API call](images/4.jpg)
Here is the formatted JSON reply from the API server([[Using pretty-json package in Atom]](https://atom.io/packages/pretty-json)):
```
{
  "coord": {
    "lon": -123.1193,
    "lat": 49.2497
  },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 295.57,
    "feels_like": 295.51,
    "temp_min": 290.72,
    "temp_max": 299.8,
    "pressure": 1012,
    "humidity": 63
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.79,
    "deg": 314,
    "gust": 7.15
  },
  "clouds": {
    "all": 20
  },
  "dt": 1624294720,
  "sys": {
    "type": 2,
    "id": 2011597,
    "country": "CA",
    "sunrise": 1624277221,
    "sunset": 1624335698
  },
  "timezone": -25200,
  "id": 6173331,
  "name": "Vancouver",
  "cod": 200
}
```
- With the help [[HTTPS module]](https://nodejs.org/api/https.html#https_https_get_url_options_callback) in node js make a get request to this api.

```
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&units=metric&appid=" + apikey

https.get(url, function(https_res) {
  https_res.on("data", function(data) {
    res.write("<h1> " + req.body.cityName + " weather is " + JSON.parse(data).weather[0].description) + "</h1>";
    res.write("<h1> " + req.body.cityName + " temp is " + JSON.parse(data).main.temp) + "</h1>";

    
    res.write('  <img src="' + "http://openweathermap.org/img/wn/" + JSON.parse(data).weather[0].icon + '.png"' + "/>");
    res.send();
  })
});
```

Notice how we use `res.write` multiple times to before calling `res.send`. Check the top answer in this [[stackoverflow post]](https://stackoverflow.com/questions/44692048/what-is-the-difference-between-res-send-and-res-write-in-express) to understand the difference between `res.write` and `res.send`. The key difference is `res.send` can be called only once where as `res.write` can be called multiple times followed by a `res.end`.

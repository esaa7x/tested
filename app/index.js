const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path')

app.use(function(request, response, next) {

  if (process.env.NODE_ENV != 'development' && !request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
})
// respond with "hello world" when a GET request is made to the homepage
app.use('/',express.static('src/login'));
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/src/login/index.html")
})


var ar = ['/menu','/om']

 app.use(ar, express.static('src/'+ar));
app.use(ar, (req, res) => {
    res.sendFile(__dirname+"/src"+req.baseUrl+"/index.html")
  })

app.listen(80);
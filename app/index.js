const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path')
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.use(requireHTTPS);
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
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mogoose = require('mongoose');
const cors = require('cors');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

// Link db connection
// require('./config/db');

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  // GET routes
  server.get('/search', (req, res) => {
    res.send("Hello world");
  })

  // POST routes
  server.post('/update', (req, res) => {
    console.log("POST route reached!");
    return res.sendStatus(200);
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

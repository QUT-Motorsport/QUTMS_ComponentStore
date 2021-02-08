const express = require('express')
const next = require('next')
var https = require('https');
var http = require('http');
const bodyParser = require('body-parser');
const { parse } = require('url');

const Component = require('./models/Component');
const Transaction = require('./models/Transaction');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { v1: uuidv1 } = require('uuid');
var fs = require('fs');
// require helmet

const server = express();
const HTTPS = true;
const serverRun = HTTPS
  ? https.createServer({
    key: fs.readFileSync('./certificates/localhost.key'),
    cert: fs.readFileSync('./certificates/localhost.crt'),
  }, server)
  : http.createServer({}, server);

// Link db connection
require('./config/db');

app.prepare().then(() => {
  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  // GET routes
  server.get('/get', async (req, res) => {
    // Retrieve query keys
    const componentName = req.query.q;
    const componentID = req.query.comp_id;

    // When user search for component name
    if (componentName) {
      // Compare input component name with Component Collection
      console.log("query with component name");
      // Query the database
      await Component.find({ component_name: { $regex: componentName.toString(), $options: "i" } }, async function (err, result) {
        if (err) throw err;
        res.json(result);
      })
    }
    else if (componentID) {
      // Compare input componentID with Component Collection
      console.log("query with component id");
      // Query the database
      await Component.find({ "component_id": componentID }, async function (err, result) {
        if (err) throw err;
        res.json(result);
      })
    } else {
      res.sendStatus(400);
    }
  })

  // HELPER FUNCTION FOR POST ROUTES
  async function checkQuantity(input, cb) {
    var validated_orders = [];
    // Update quantity in component collection
    input.forEach(async function (item, index, arr) {
      console.log(item.quantity);
      // Check order if all quanity is valid
      await Component.find({ "component_id": item.component_id }, async function (err, result) {
        if (err) throw err;
        console.log(result[0].quantity);
        validated_orders.push(
          {
            component_id: item.component_id,
            quantity: item.deposit ? result[0].quantity + item.quantity : result[0].quantity - item.quantity
          }
        );
      })
      if (index === arr.length - 1) {
        // callbacks the value
        cb(validated_orders, "validated_orders");
      }
    });
  }

  // POST routes
  server.post('/update', async (req, res) => {
    var validated_orders = [];
    console.log("POST route reached!");
    try {
      await new Promise((resolve, reject) => {
        checkQuantity(req.body.order_details, (value, status) => {
          if (status === 'validated_orders') {
            validated_orders = value;
            console.log(validated_orders);
          }
          resolve();
        });
      });
      // Exit or execute queries to database
      if (validated_orders.map(item => item.quantity).some(e => e < 0)) {
        // Send back 400
        console.log("cancel");
        res.status(400).json({ error: 'Insufficient quantity for order!' });
      } else {
        validated_orders.forEach(async function (item) {
          await Component.updateOne(
            { component_id: item.component_id },
            {
              $set:
                { quantity: item.quantity }
            },
            function (err, response) {
              if (err) throw err;
              console.log('Collection Component updated sucessfully!');
            }
          );
        })
        // Generate uuid with timestamp
        const unique_id = uuidv1();
        // Retrieve current time for transaction
        const time = new Date();
        const formattedTime =
          time.getDate() + "-" +
          time.getMonth() + 1 + "-" +
          time.getFullYear() + " " +
          time.getHours() + ":" +
          time.getMinutes() + ":" +
          time.getSeconds();
        const transaction = new Transaction
          ({
            receipt_id: unique_id,
            student_id: req.body.stu_id,
            student_name: req.body.stu_name,
            time: formattedTime,
            order_details: req.body.order_details
          });
        // Save to Transaction collection
        transaction.save(function (err) {
          console.log("Transaction has been successfully made!");
          return res.sendStatus(200);
        })
      }
    } catch (err) {
      if (err) res.status(404).send({ error: 'Unsucessful POST request!' });
    }
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  serverRun.listen(port, (err) => {
    if (err) throw err
    console.log(`> Server ready on http${HTTPS ? 's' : ''}://localhost:${port}`);
  })
})

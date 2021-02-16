const express = require('express')
const next = require('next')
var https = require('https');
var http = require('http');
const bodyParser = require('body-parser');

// MongoDB schema models
const Component = require('./models/Component');
const Transaction = require('./models/Transaction');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

// import CORS and fs for file reading
const cors = require('cors');
var fs = require('fs');

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
  server.get('/api/get', async (req, res) => {
    // Retrieve query keys
    const componentName = req.query.name;
    const componentID = req.query.comp_id;
    const componentPartID = req.query.part_id;
    const componentRetailID = req.query.retail_id;

    // When user search for component name
    if (componentName) {
      // Compare input component name with Component Collection
      console.log("Query with component name: " + componentName);
      // Query the database
      await Component.find({ component_name: { $regex: componentName.toString(), $options: "i" } }, async function (err, result) {
        if (err) throw err;
        res.json(result);
      })
    }
    else if (componentID) {
      // Compare input componentID with Component Collection
      console.log("Query with component id: " + componentID);
      // Query the database
      await Component.find({ "component_id": componentID }, async function (err, result) {
        if (err) throw err;
        res.json(result);
      })
    } else if (componentPartID) {
      // Compare input component part number with Component Collection
      console.log("Query with component part number: " + componentPartID);
      // Query the database
      await Component.find({ "part_number": { $regex: componentPartID.toString(), $options: "i" } }, async function (err, result) {
        if (err) throw err;
        res.json(result);
      })
    } else if (componentRetailID) {
      // Compare input component retail number with Component Collection
      console.log("Query with component retail part number: " + componentRetailID);
      // Query the database
      await Component.find({ "retail_part_number": { $regex: componentRetailID.toString(), $options: "i" } }, async function (err, result) {
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
      // Check order if all quanity is valid
      await Component.find({ "component_id": item.component_id }, async function (err, result) {

        if (err) throw err;
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
  server.post('/api/update', async (req, res) => {
    var validated_orders = [];
    try {
      // Create a promise and user checkQuanity function so that it would execute sequentially before create a new transaction in db
      await new Promise((resolve, reject) => {
        checkQuantity(req.body.order_details, (value, status) => {
          if (status === 'validated_orders') {
            validated_orders = value;
          }
          // Resolve when its done to execute the next line of codd
          resolve();
        });
      });
      // Exit or execute queries to database
      if (validated_orders.map(item => item.quantity).some(e => e < 0)) {
        // Send back 400
        res.status(400).json({ error: 'Insufficient quantity for order!' });
      } else {
        // If order is valid, loop through each component to update the new quantity in db
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
        // Retrieve current time for transaction
        const time = new Date();
        const formattedTime =
          time.getDate() + "-" +
          (parseInt(time.getMonth()) + 1).toString() + "-" +
          time.getFullYear() + " " +
          time.getHours() + ":" +
          time.getMinutes() + ":" +
          time.getSeconds();
        // Format the transaction details
        const transaction = new Transaction
          ({
            student_id: req.body.stu_id,
            student_name: req.body.stu_name,
            time: formattedTime,
            order_details: req.body.order_details
          });
        // Save to Transaction collection in db
        transaction.save(function (err) {
          console.log("Timestamp: " + formattedTime + ". Transaction has been successfully made");
          return res.sendStatus(200);
        })
      }
    } catch (err) {
      if (err) res.status(404).send({ error: 'Unsucessful POST request!' });
    }
  })

  // Hanlde client routes
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  serverRun.listen(port, (err) => {
    if (err) throw err
    console.log(`> Server ready on http${HTTPS ? 's' : ''}://localhost:${port}`);
  })
})

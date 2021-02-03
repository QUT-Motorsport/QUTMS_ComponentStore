const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { v1: uuidv1 } = require('uuid');
// require helmet

const Component = require('./models/Component');
const Transaction = require('./models/Transaction');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

// Link db connection
require('./config/db');

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

  // POST routes
  server.post('/update', async (req, res) => {
    console.log("POST route reached!");
    try {
      // Update quantity in component collection
      req.body.order_details.forEach(async function (item) {
        console.log(item.component_id);
        // Getthe current quantity of item
        await Component.find({ "component_id": item.component_id }, async function (err, result) {
          console.log('pass find component query');
          if (err) throw err;
          const remain_quantity = result[0].quantity - item.quantity;
          console.log('Checked quantity! Quantity is ' + remain_quantity);
          if (remain_quantity < 0) {
            console.log('Insufficient quantity!');
            res.status(400).json({ error: 'Insufficient quantity for order!' });
            throw BreakException;
          } else {
            await Component.updateOne(
              { component_id: item.component_id },
              {
                $set:
                  { quantity: remain_quantity }
              },
              function (err, response) {
                if (err) throw err;
                console.log('Collection Component updated sucessfully!');
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
            );
          }
        })
      });
    } catch (err) {
      if (err !== BreakException) res.status(404).send({ error: 'Unsucessful POST request!' });
    }
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

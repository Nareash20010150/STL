const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const amount = req.query.amount || 0; // Default to 0 if not provided

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'LKR',
      amount: amount,
      automatic_payment_methods: { enabled: true },
    });
    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.post("/payment" , async (req, res) => {

  try {
    const amount = req.query.amount || 0; // Default to 0 if not provided

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'LKR',
      amount: amount,
      automatic_payment_methods: { enabled: true },
    });

    //query
    const { payment_id, payment_date, payment_amount,user_id} = req.body
    const result = await query('INSERT INTO payment (payment_id, payment_type, payment_date, payment_amount, payment_status) VALUES ($1, $2, $3, $4) RETURNING *',
     [payment_id, payment_date, payment_amount, user_id]);
     res.status(200).json(result.rows[0])
    res.status(200).json(paymentIntent)
  }
  catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }});


  app.get("/paymentHistory", async (req, res) => {
    const customer_id = req.query.customer_id;

    try {
      const viewDropQuery  =  "SELECT * FROM payment WHERE customer_id = $1";
      const queryResult  = await query(viewDropQuery, [customer_id])
      return queryResult.rows
    } catch (e) {
      
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });


  //get  customer bills from  springboot in billing service
app.post('/api/receiveData', (req, res) => {

    const receivedData = req.body;


    res.status(200).send('Data received and processed');
});

//get unpaid bills
app.get("/paymentBills", async (req, res) => {
  const customer_id = req.query.customer_id;

  try {
    const viewDropQuery  =  "SELECT * FROM bills WHERE customer_id = $1";
    const queryResult  = await query(viewDropQuery, [customer_id])
    return queryResult.rows
  } catch (e) {
    
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});


app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
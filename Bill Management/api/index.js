const express = require('express');
//redirect our request based on the end point
const proxy = require('express-http-proxy');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/payment', proxy('http://localhost:4002'));




app.listen(4001, () => {

    console.log("Payment Service is running on port 4001");
});
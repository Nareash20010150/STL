const express = require('express');


const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {

    return res.status(200).json({
        "msg": "Payment Service"
    });

});


app.listen(4002, () => {

    console.log("Payment Service is running on port 4001");
});
const express = require("express");
const cors = require("cors")
const paypal = require('paypal-rest-sdk');
const app = express();
const port = 8080;

app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true
}))

const router = require("./router");

app.use("/", router);

app.get('/paypal-response', async function(req, res) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const response = {
        message: ''
    }

    const execute_payment_json = {
        "payer_id": payerId,
    };
    
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if(error) {
            response.message = 'Fail';
            res.redirect('http://localhost:3000/complete-order?message=Fail')
        }
        else{
            response.message = 'Success';
            res.redirect('http://localhost:3000/complete-order?message=Success')
        }
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));

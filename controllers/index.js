const paypal = require("./paypal");

const pay = async (req,res) => {
  const response ={
    paymentUrl: '',
    exitcode: '',
    message: ''
  }
  
  if(req.body?.PaymentMethod.toUpperCase().normalize() === 'PAYPAL'){
    const result = await paypal.payPalPay(req.body);

    if (result.resultCode === 1){
        response.paymentUrl = result.paymentUrl;
    }
    response.exitcode = result.resultCode;
    response.message = result.message;
  }
  return res.send(response)
} 

module.exports = {pay}
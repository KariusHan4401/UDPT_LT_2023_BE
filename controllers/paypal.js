const paypal = require('paypal-rest-sdk');
var url_lib = require('url');
require("dotenv").config();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
});

const BE = process.env.BE_APP_HOST

const create_payment_json = (PayPalData) => {
    let MoneyTotal = PayPalData.MoneyTotal.toFixed(1);
    let SubTotal = PayPalData.SubTotal.toFixed(1);
    let Taxes = PayPalData.Taxes.toFixed(1);

    return {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": BE + "/paypal-response?success=true",
            "cancel_url": BE + "/paypal-response?success=fail"
        },
        "transactions": [{
            // "item_list": {
            //     "items": [{
            //         "name": "item",
            //         "sku": "item",
            //         "price": props.value,
            //         "currency": "USD",
            //         "quantity": 1
            //     }]
            // },
            "item_list":{},
            "amount": {
                "currency": "USD",
                "total": MoneyTotal,
            },
            "description": "Thực hiện demo thanh toán",
        }]
    }
};

const payPalPay = async (PayPalData) => {
    return new Promise((resolve) =>{
        paypal.payment.create(create_payment_json(PayPalData), function (error, payment) {
            if (error) {
                var text = {
                    'resultCode':400,
                    'message' : 'Thất bại'
                }
                resolve(text)
            } else {
                for(let i = 0;i < payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                        var text  = {
                            'resultCode' : 1,
                            'message'    : 'Success',
                            'paymentUrl'     : payment.links[i].href,
                        }
                        resolve(text);
                    }
                }
            }
        });
    });
}

module.exports =  {payPalPay}
const express = require("express");
const router = express.Router();

const paypalController = require("../controllers/index.js");

router.post("/paypal-pay", paypalController.pay);

router.get("/text", (req,res)=>{
    return res.status(200).json({ success: false, message: "Wrong phone or password!" });
})

module.exports = router;

// /complete-order?success=true&message=Success
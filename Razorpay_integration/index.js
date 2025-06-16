
const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('./User');
const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();
const port = 5000
const KEY_ID=process.env.KEY_ID
const KEY_SECRET=process.env.KEY_SECRET

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/testpayment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});




const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

// Create order
app.post('/create-order', async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 10000, // ₹100 in paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    });
    console.log(order)
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed' });
  }
});


// get payment info

app.get("/payment/:paymentid",async(req,res)=>{
    const {paymentid} = req.params;
    console.log(paymentid)
     const razorpay = new Razorpay({
       key_id:KEY_ID,
       key_secret:KEY_SECRET
    })

    try {
          const payment = await razorpay.payments.fetch(paymentid);
          if(!payment){
            return res.status(500).json({message:"No paymant done till"})
          }

          res.status(200).json({
            status:payment.status,
            method:payment.method,
            amount:payment.amount,
            currency:payment.currency,
            id : payment.id
          })
    } catch (error) {
         res.status(500).send("failde to fetch payment info")
    }
    
})

// mark premium user
app.post('/mark-paid', async (req, res) => {
  const { clerkUserId, orderId, paymentId } = req.body;

  try {
    // Upsert: create user if not exists
    await User.findOneAndUpdate(
      { clerkUserId },
      {
        isPaid: true,
        interviewCount: 50,
        lastOrderId: orderId,
        lastPaymentId: paymentId,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'User marked as premium.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user status' });
  }
});


app.listen(port,()=>{
    console.log("Server started on port no",port)
})
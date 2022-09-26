const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const Stripe = require('stripe');
// const stripe = Stripe(process.env.STR_SECRET_TEST_KEY)
// const stripe = Stripe(sk_test_51LR1fDAQgXqoSBoKRas5yTDqesHAvyBfrcXRV1mTQVgUlKL0CdSQ5Ry2QXkhlkfT3fxJVyAbDV45TEbXUEO2748K00ACbBPF9X)
const StripeModel = require('./models/StripeCheckout');





const app = express();


// Require cors
var cors = require('cors')
app.use(cors());



// Load environment variables
dotenv.config({ path: './config/config.env' });



// Connect to database
connectDB();


// Body parser 
app.use(express.json({extended: false}));

// Load stripe variable
const stripe = Stripe(process.env.STR_SECRET_TEST_KEY)



// // Route Files
// const shipping = require('./routes/shipping');
// // Mount routers
// app.use('/api/shipping', shipping);


//Define Routes
app.use('/api/shipping', require('./route/api/shipping'));
// app.use('/checkout', require('./route/api/stripeCheckout'))






// @route   Post api/shipping
// @desc    Post shipping details 
// @access  Private

app.post("/checkout", async (req, res) =>
{
    try {
            // let { email, amount, paymentMethod, subscription } = req.body;
            let { email, amount, stripeToken, subscription } = req.body;
            
            console.log(stripeToken)
            
            if (!email || !amount || !stripeToken)
            // if (!email || !amount)
            {
                return res.status(400).json({ status: 400, message: "Invalid credentials"})
            }
            amount = parseInt(amount);
            
        if (subscription === "onetime")
        {
            // One time payment code here
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: "usd",
                receipt_email: email,
                description: "Payment for donation",
                payment_method: stripeToken,
                confirm: true
            })

            // console.log(paymentIntent)
        
            if (paymentIntent.status === "succeeded")
            {
                // Payment successfull
                return res.json({
                    status: 200,
                    message: "Payment Successful",
                    id: paymentIntent.id
                })
            }
            if (paymentIntent.status === "requires_action")
            {
                return res.json({
                    status: 200,
                    message: "3D secure required",
                    actionRequired: true,
                    clientSecret: paymentIntent.client_secret
                })
            }
            return res.status(400).json({
                status: 400,
                message: "Payment failed!"
            })
        }
        
        res.status(400).json({status: 400, message: "Invalid type"})
        // if (subscription === "onetime")
        // {
        //     //Recurring payment code here
        // }

        // const stripeModel = await StripeModel.create(paymentIntent);
        // // res.json(shipping);
        // res.status(200).json({
        //     success: true,
        //     data: stripeModel
        // })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 200, message: " Internal server error" });
    }
})



// @route   Get Authenticated
// @desc    Get Authenticated using 3D
// @access  Private

app.get('/check/:id', async (req, res) =>
{ 
    try {
        const id = req.params.id;
        const paymentIntent = await stripe.paymentIntent.retrieve(id);
        if (paymentIntent?.status === "succeeded")
        {
            return res.json({
                status: 200,
                message: "payment successful",
                id,
            })
        }
        res.status(400).json({status: 200, message: "Payment failed! Please try again later"})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, message: "Internal server error"})
    }
})












const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) =>
{
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
})
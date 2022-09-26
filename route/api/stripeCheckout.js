// const express = require('express');
// const router = express.Router();
// const uuid = require('uuid').v4;
// const Stripe = require('stripe')
// const stripe = Stripe(process.env.STR_SECRET_LIVE_KEY || process.env.STR_SECRET_TEST_KEY);
// const StripeModel = require('../../models/StripeCheckout');




// // @route   Get api/shopping cart total amount
// // @desc    Get shopping cart total amount details
// // @access  Private






// @route   Post api/shipping
// @desc    Post shipping details 
// @access  Private

// router.post('/', async (req, res) =>
// {
//     try {
//             let { email, amount, paymentMethod, subscription } = req.body;
//             if (!email || !amount || !paymentMethod)
//             {
//                 return res.status(400).json({ status: 400, message: "Invalid credentials"})
//             }
//             amount = parseInt(amount);
            
//         if (subscription === "onetime")
//         {
//             // One time payment code here
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: Math.round(amount * 100),
//                 currency: "usd",
//                 receipt_email: email,
//                 description: "Payment for donation",
//                 payment_method: paymentMethod,
//                 confirm: true
//             })

//             console.log(paymentIntent)
        
//             if (paymentIntent.status === "succeeded")
//             {
//                 // Payment successfull
//                 return res.json({
//                     status: 200,
//                     message: "Payment Successful",
//                     id: paymentIntent.id
//                 })
//             }
//             if (paymentIntent.status === "requires_action")
//             {
//                 return res.json({
//                     status: 200,
//                     message: "3D secure required",
//                     actionRequired: true,
//                     clientSecret: paymentIntent.client_secret
//                 })
//             }
//             return res.status(400).json({
//                 status: 400,
//                 message: "Payment failed!"
//             })
//         }
        
//         res.status(400).json({status: 400, message: "Invalid type"})
//         // if (subscription === "onetime")
//         // {
//         //     //Recurring payment code here
//         // }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: 200, message: " Internal server error" });
//     }
//     // try {
        
//     //     const stripe = await StripeModel.create(req.body);
//     //     // res.json(shipping);
//     //     res.status(200).json({
//     //         success: true,
//     //         data: stripe
//     //     })


//     // } catch (err) {
//     //     console.error(err.message);
//     //     res.status(404).send('Nothing found')
//     // }

//     // let error;
//     // let status;
//     // try
//     // {
//     //     const { product, token } = req.body
            
//     //     const customer = await stripe.customers.create({
//     //         email: token.email,
//     //         source: token.id
//     //     })

//     //     const key = uuid();
//     //     // const idempotency_key = uuid()
//     //     const charge = await stripe.charges.create({
//     //         amount: product.price * 100,
//     //         currency: 'usd',
//     //         customer: customer.id,
//     //         receipt_email: token.email,
//     //         description: `Purchased the ${product.name}`,
//     //         shipping: {
//     //             name: token.card.name,
//     //             address: {
//     //                 line1: token.card.address_line1,
//     //                 line2: token.card.address_line2,
//     //                 city: token.card.address_city,
//     //                 country: token.card.address_country,
//     //                 // postal_code: token.card.address_zip,
//     //             },
//     //         },
//     //     },
//     //         {
//     //             // idempotency_key,
//     //             key,
//     //         }
//     //     );

//     //     console.log("Charge:", { charge });
//     //     status = "success";



//     // } catch (error)
//     // {
//     //     console.log(error);
//     //     status = "failure";
//     // }
        
//     // res.json({ error, status })


// //     try {
// //         let { status } = await stripe.charges.create({
// //             amount: req.body.amount,
// //             currency: 'usd',
// //             source: req.body.token,
// //         })
// //         return res.json({status})
// //     } catch (error) {
// //         console.log(err);
// //         res.status(500).end()
// //     }
// });


// // @route   Get Authenticated
// // @desc    Get Authenticated using 3D
// // @access  Private

// router.post('/check/:id', async (req, res) =>
// { 
//     try {
//         const id = req.params.id;
//         const paymentIntent = await stripe.paymentIntent.retrieve(id);
//         if (paymentIntent?.status === "succeeded")
//         {
//             return res.json({
//                 status: 200,
//                 message: "payment successful",
//                 id,
//             })
//         }
//         res.status(400).json({status: 200, message: "Payment failed! Please try again later"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({status: 500, message: "Internal server error"})
//     }
// })




// module.exports = router ;
























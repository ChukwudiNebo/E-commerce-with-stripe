const express = require('express');
const router = express.Router();


const Shipping = require('../../models/Shipping');


// @route   Post api/shipping
// @desc    Post shipping details 
// @access  Public

router.post('/', async (req, res) =>
{
    try {
        
        const shipping = await Shipping.create(req.body);
        // res.json(shipping);
        res.status(200).json({
            success: true,
            data: shipping
        })


    } catch (err) {
        console.error(err.message);
        res.status(404).send('Nothing found')
    }
});


module.exports = router ;
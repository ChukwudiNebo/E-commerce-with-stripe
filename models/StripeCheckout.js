const mongoose = require('mongoose');

const StripeCheckoutSchema = new mongoose.Schema({
    paymentID: {
        type: Number,
        required: [true, 'Please add a number']
    },
})

module.exports = mongoose.model('StripeCheckout', StripeCheckoutSchema);
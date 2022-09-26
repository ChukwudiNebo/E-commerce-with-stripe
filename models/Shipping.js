const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
    // allShippingDetails: {
    //     type: Object,
    //     required: [true, 'Invalid Details']
    // }
    firstName: {
        type: String,
        required: [true, 'Please add a name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        validate: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: Number,
        required: [true, 'Please add a number']
    },
    address: {
        type: String,
        required: [true, 'Please add valid address'],
        unique: true,
    },
    address2: {
        type: String,
        required: [true, 'Please add valid address']
    },
    // "shippingDetails": [{"id": "1", "name": "Slim Shirt", "quantity": "3", "image": "/images/one.jpg", "price": "60"}] 
    // // Added product details
    // // Add 
    shippingDetails: {
        type: Array,
        required: [true, 'No shipping details and product added']
    },
    tax: {
        type: Number,
        required: [true, 'Please add the product price']
    },
    totalAmount: {
        type: Number,
        required: [true, 'Please add the product quantity']
    }
})

module.exports = mongoose.model('Shipping', ShippingSchema);
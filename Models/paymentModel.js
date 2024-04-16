const mongoose = require('mongoose');

// Define the Payment Schema
const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['succeeded', 'failed', 'pending'], // Payment status: succeeded, failed, pending
        default: 'pending'
    },
    paymentMethod: {
        type: String // You can store additional information about the payment method if needed
    },
    // Add more fields as needed
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

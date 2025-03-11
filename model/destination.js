const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    attractions: {
        type: String,
        required: true
    },
    bestTimeToVisit: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

let DESTINATION = mongoose.model('destination', destinationSchema);
module.exports = DESTINATION;
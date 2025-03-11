const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubdestinationSchema = new Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destination',
        required: true
    },
    attractions: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        include: {
            type: String,
            required: true
        },
        imageurl: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
});

let SubDestination = mongoose.model('subdestination', SubdestinationSchema);
module.exports = SubDestination;
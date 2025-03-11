let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookingSchema = new Schema({  
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "userId is required please fill it"]
    },
    email: {
        type: String,
        required: [true, "email is required please fill it"]
    },
    phone: {
        type: Number,
        required: [true, "phone is required please fill it"]
    },
    PreferredTravelDate: {
        type: Date,
        required: [true, "Preferred Travel Date is required please fill it"]
    },
    noOfPeople: {
        type: Number,
        required: [true, "noOfPeople is required please fill it"]
    },
    Adults: {
        type: Number
    },
    Children: {
        type: Number
    },
    Message: {
        type: String
    },
    selectPackage: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"destination",
        required: [true, "Package is required please fill it"]
    },
    transportation: {
        type: String,
        enum: ['Bus', 'Train', 'Flight'],
        required: [true, "transportation is required please fill it"]
    },
    totalAmount: {
        type: Number,
        required: [true, "totalAmount is required please fill it"]
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    
})

let Booking = mongoose.model('booking', bookingSchema);
module.exports = Booking;
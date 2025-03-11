let Booking = require('../model/booking')
let DESTINATION = require('../model/destination')

exports.createBooking = async (req, res) => {
    try {
        let {userId, email, phone, PreferredTravelDate, noOfPeople, totalAmount,Adults, Children, Message,selectPackage,transportation, paymentStatus } = req.body

        let destination = await DESTINATION.findById(selectPackage);
        if (!destination) {
            return res.status(404).json({
                status: "unsuccessful",
                message: "Destination not found"
            });
        }
        let TotalAmount = noOfPeople * destination.price;
        
        let BookingData = await Booking.create({
            userId,
            email,
            phone,
            PreferredTravelDate,
            noOfPeople,
            Adults,
            Children,
            selectPackage,
            transportation,
            Message,
            totalAmount: TotalAmount,
            paymentStatus
        })

        res.status(201).json({
            status: "success",
            message: "booking successfully",
            BookingData
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "booking unsuccessfully",
            error: error.message
        })
    }
}

exports.readBooking = async (req,res) => {
 
    try {
        
        let BookingData = await Booking.find().populate('selectPackage').populate('userId')
        res.status(200).json({
            status: "success",
            message: "booking read successfully",
            BookingData
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "booking read unsuccessfully",
            error: error.message
        })
    }

}
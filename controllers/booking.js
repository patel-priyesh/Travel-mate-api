let Booking = require('../model/booking')
let DESTINATION = require('../model/destination')
let newuser = require('../model/user')
let nodemailer = require('nodemailer');
let jwt = require('jsonwebtoken');

exports.createBooking = async (req, res) => {
    try {
        let { userId, email, phone, PreferredTravelDate, noOfPeople, Adults, Children, Message, selectPackage, transportation, paymentStatus } = req.body

        let destination = await DESTINATION.findById(selectPackage);
        if (!destination) {
            return res.status(404).json({
                status: "unsuccessful",
                message: "Destination not found"
            });
        }
        let TotalAmount = noOfPeople * destination.price;

        let username = await newuser.findById(userId);
        if (!username) throw new Error("User not found");

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

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "patelpriyesh2023.katargam@gmail.com",
                pass: "ydawbbssqkhdfrkt",
            },
        });


        async function main() {
            const info = await transporter.sendMail({
                from: '"Travel-Mate ✈️✈️✈️" <patelpriyesh2023.katargam@gmail.com>',
                to: email,
                subject: "Booking Confirmation ✔",
                text: `Hello, your booking has been confirmed. Booking details: ${JSON.stringify(BookingData)}`,
                html: `<h1>Booking Confirmation</h1>
                    <p>Hello ${username.name} , your booking has been confirmed. Booking details:</p>
                    <table border="1">
                        <tr><th>Field</th><th>Details</th></tr>
                        <tr><td>Name 🧑‍🦰</td><td>${username.name}</td></tr>
                        <tr><td>Email 📩</td><td>${BookingData.email}</td></tr>
                        <tr><td>Phone 📞</td><td>${BookingData.phone}</td></tr>
                        <tr><td>Preferred Travel Date 📅</td><td>${BookingData.PreferredTravelDate}</td></tr>
                        <tr><td>Number of People 👨‍👩‍👧‍👦</td><td>${BookingData.noOfPeople}</td></tr>
                        <tr><td>Adults 🧑‍🤝‍🧑</td><td>${BookingData.Adults}</td></tr>
                        <tr><td>Children 🚸</td><td>${BookingData.Children}</td></tr>
                        <tr><td>Package 🗺️</td><td>${destination.name}</td></tr>
                        <tr><td>Transportation 🚌🚇✈️</td><td>${BookingData.transportation}</td></tr>
                        <tr><td>Message 🗨️</td><td>${BookingData.Message}</td></tr>
                        <tr><td><b>Total Amount 🪙💵</b></td><td><b style="color:green;">${BookingData.totalAmount}</b></td></tr>
                        <tr><td><b>Payment Status💲</b></td>
                        <td>
                                <b style="color:${BookingData.paymentStatus === 'Paid' ? 'green' : 'red'};">
                                    ${BookingData.paymentStatus}
                                </b>
                            </td>
                        </tr>
                    </table>
                    <b><p>Thank you for booking with us. Have a great day!</p></b>`,
            });

            console.log("Message sent: %s", info.messageId);
        }

        main().catch(console.error);

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

exports.readBooking = async (req, res) => {

    try {

        let BookingData = await Booking.find().populate('selectPackage').populate('userId', 'name',)
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

exports.updateBooking = async (req, res) => {

    try {

        let currentTime = new Date();
        let bookingTime = new Date(BookingData.createdAt);
        let timeDifference = (currentTime - bookingTime) / 1000 / 60 / 60;

        if (timeDifference > 24) {
            return res.status(403).json({
                status: "unsuccessful",
                message: "Cannot update booking after 24 hours of creation"
            });
        }

        let BookingData = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!BookingData) throw new Error("booking not found")

        res.status(200).json({
            status: "success",
            message: "booking update successfully",
            BookingData
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "booking update unsuccessfully",
            error: error.message
        })
    }

}


exports.deleteBooking = async (req, res) => {

    try {
        let currentTime = new Date();
        let bookingTime = new Date(BookingData.createdAt);
        let timeDifference = (currentTime - bookingTime) / 1000 / 60 / 60;
        if (timeDifference > 24) {
            return res.status(403).json({
                status: "unsuccessful",
                message: "Cannot delete booking after 5 minutes of creation"
            });
        }
        let BookingData = await Booking.findByIdAndDelete(req.params.id)
        if (!BookingData) throw new Error("booking not found")

        res.status(200).json({
            status: "success",
            message: "booking delete successfully"
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "booking delete unsuccessfully",
            error: error.message
        })
    }

}
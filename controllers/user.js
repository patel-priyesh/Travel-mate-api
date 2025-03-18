let USER = require("../model/user")
let jwt = require('jsonwebtoken');

exports.secure = async (req, res, next) => {
    try {

        let token = req.headers.authorization;
        if (!token) throw new Error("please provide token");
        let decoded = jwt.verify(token, "booking");
        let { id } = decoded;
        let userdata = await USER.findById(id);
        if (!userdata) throw new Error("user not found");
        req.user = userdata;

        next();

    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "user not found",
            error: error.message
        })
    }
}

exports.read = async (req, res) => {
    try {
        let userdata = await USER.find()
        res.status(200).json({
            status: "success",
            message: "user read successfully",
            userdata
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "user read unsuccessfully",
            error: error.message
        })
    }

}

exports.create = async (req, res, next) => {

    try {
        let { name, email, password, role } = req.body

        let alreadyExists = await USER.findOne({ email: email })
        if (alreadyExists) throw new Error(`user with email ${email} already exists`);


        let userdata = await USER.create({ name, email, password, role })

        res.status(201).json({
            status: "success",
            message: "created successfully",
            userdata
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "created unsuccessfully",
            error: error.message
        })
    }

}

exports.login = async (req, res, next) => {

    try {

        let { email, password } = req.body

        if (!email || !password) throw new Error("please provide email and password");

        let finddata = await USER.findOne({ email: email })
        if (!finddata) throw new Error("invalid email");
        if (finddata.password !== password) throw new Error("invalid password");

        let token = jwt.sign({ id: finddata._id }, "booking", { expiresIn: "15m" })

        res.status(200).json({
            status: "success",
            message: `${finddata.role} with email ${email} logged in successfully`,
            finddata,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "logged in unsuccessfully",
            error: error.message
        })
    }
}

exports.update = async (req, res) => {

    try {

        if (!req.params.id) throw new Error("please provide id")

        updatedata = await USER.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedata) throw new Error("user not found")

        res.status(200).json({
            status: "success",
            message: `${updatedata.role} update successfully`,
            updatedata
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: `${updatedata.role} update unsuccessfully`,
            error: error.message
        })
    }

}

exports.delete = async (req, res) => {

    try {

        if (!req.params.id) throw new Error("please provide id")

        deletedata = await USER.findByIdAndDelete(req.params.id)
        if (!deletedata) throw new Error("user not found")

        res.status(200).json({
            status: "success",
            message: `${deletedata.role} delete unsuccessfully`,
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: `${deletedata.role} delete unsuccessfully`,
            error: error.message
        })
    }

}
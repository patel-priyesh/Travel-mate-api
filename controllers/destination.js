let DESTINATION = require("../model/destination");

exports.create = async (req, res, next) => {
    try {
        let { name, location, description, attractions, bestTimeToVisit, days, imageUrl, rating, price} = req.body

        let alreadyExists = await DESTINATION.findOne({ name: name })
        if (alreadyExists) throw new Error(`destination with name ${name} already exists`);
        
        let userdata = await DESTINATION.create({ name, location, description, attractions, bestTimeToVisit, days, price ,imageUrl, rating})

        res.status(201).json({
            status: "success",
            message: "destination create successfully",
            userdata
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "destination create unsuccessfully",
            error: error.message
        })
    }
}

exports.read = async (req, res) => {

    try {
        let descriptiondata = await DESTINATION.find()

        res.status(200).json({
            status: "success",
            message: "destination read successfully",
            descriptiondata
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "destination read unsuccessfully",
            error: error.message
        })
    }

}

exports.update= async (req,res) => {

    try {
    
        let destinationupdate = await DESTINATION.findByIdAndUpdate(req.params.id,req.body, { new: true })
        
        res.status(200).json({
            status: "success",
            message: "destination update successfully",
            destinationupdate
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "destination update unsuccessfully",
            error: error.message
        })
    }
    
}

exports.delete = async (req,res) => { 
    try {
        let destinationdelete = await DESTINATION.findByIdAndDelete(req.params.id)
        if (!destinationdelete) throw new Error("destination not found")
        
        res.status(200).json({
            status: "success",
            message: "destination delete successfully"
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "destination delete unsuccessfully",
            error: error.message
        })
    }

}
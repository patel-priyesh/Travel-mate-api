let SubDestination = require('../model/subdestination')

exports.create = async (req, res) => {

    try {
        let { destinationId,attractions} = req.body

       for (const element of attractions) {
        let alreadyExists = await SubDestination.findOne({ "attractions.name": element.name });
        if (alreadyExists) throw new Error(`subdestination with name ${element.name} already exists`);
       }

        let subdestinationdata = await SubDestination.create(
            {
                destinationId,
                attractions,
            })

        res.status(201).json({
            status: "success",
            message: "subdestination create successfully",
            subdestinationdata
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "subdestination create unsuccessfully",
            error: error.message
        })
    }

}

exports.read = async (req, res) => {

    try {
        let subdestinationdata = await SubDestination.find().populate('destinationId')

        res.status(200).json({
            status: "success",
            message: "subdestination read successfully",
            subdestinationdata
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "subdestination read unsuccessfully",
            error: error.message
        })
    }

}

exports.update = async (req,res) => {
    try {
        
        let subdestinationupdate = await SubDestination.findByIdAndUpdate(req.params.id,req.body, { new: true })
        if (!subdestinationupdate) throw new Error("subdestination not found")

        res.status(200).json({
            status: "success",
            message: "subdestination update successfully",
            subdestinationupdate
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "subdestination update unsuccessfully",
            error: error.message
        })
    }
}

exports.delete = async (req,res) => {
    try {
        let subdestinationdelete = await SubDestination.findByIdAndDelete(req.params.id)
        if (!subdestinationdelete) throw new Error("subdestination not found")
        
        res.status(200).json({
            status: "success",
            message: "subdestination delete successfully",
        })
    } catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            message: "subdestination delete unsuccessfully",
            error: error.message
        })
    }
}
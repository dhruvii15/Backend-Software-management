const HIRING = require('../models/hiring');


exports.Create = async function (req, res, next) {
    try {
        req.body.resume = req.file.filename
        const dataCreate = await HIRING.create(req.body);

        res.status(201).json({
            status: 'Success!',
            message: 'Hiring Created Successfully',
            data: dataCreate,
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail!',
            message: error.message,
        });
    }
};

exports.Read = async function (req, res, next) {
    try {
        const dataFind = await HIRING.find()

        res.status(200).json({
            status: "Success!",
            message: "Hiring Found Successfully",
            data: dataFind
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        });
    }
};


exports.Update = async function (req, res, next) {
    try {
        if (req.file) {
            req.body.resume = req.file.filename
        }
        
        let dataUpdate = await HIRING.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "Success!",
            message: "Hiring Update Successfully",
            data: dataUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


exports.Delete = async function (req, res, next) {
    try {
        let dataDelete = await HIRING.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "Hiring Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

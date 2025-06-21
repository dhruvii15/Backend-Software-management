const EVA = require('../models/evaluations');


exports.Create = async function (req, res, next) {
    try {
        const dataCreate = await EVA.create(req.body);

        res.status(201).json({
            status: 'Success!',
            message: 'evaluations Created Successfully',
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
        const dataFind = await EVA.find()

        res.status(200).json({
            status: "Success!",
            message: "evaluations Found Successfully",
            data: dataFind
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        });
    }
};

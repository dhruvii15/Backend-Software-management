const EMPLOYEE = require('../models/employee');
const INTERN = require('../models/intern');


exports.Create = async function (req, res, next) {
    try {
        console.log(req.body);
        
        const dataCreate = await EMPLOYEE.create(req.body);

        res.status(201).json({
            status: 'Success!',
            message: 'Employee Created Successfully',
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
        const dataFind = await EMPLOYEE.find()

        res.status(200).json({
            status: "Success!",
            message: "Employee Found Successfully",
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
        let dataUpdate = await EMPLOYEE.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "Success!",
            message: "Employee Update Successfully",
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
        let dataDelete = await EMPLOYEE.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "Employee Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


// intern
exports.InternCreate = async function (req, res, next) {
    try {
        const dataCreate = await INTERN.create(req.body);

        res.status(201).json({
            status: 'Success!',
            message: 'Intern Created Successfully',
            data: dataCreate,
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail!',
            message: error.message,
        });
    }
};

exports.InternRead = async function (req, res, next) {
    try {
        const dataFind = await INTERN.find()

        res.status(200).json({
            status: "Success!",
            message: "Intern Found Successfully",
            data: dataFind
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        });
    }
};


exports.InternUpdate = async function (req, res, next) {
    try {
        let dataUpdate = await INTERN.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "Success!",
            message: "Intern Update Successfully",
            data: dataUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


exports.InternDelete = async function (req, res, next) {
    try {
        let dataDelete = await INTERN.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "Intern Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

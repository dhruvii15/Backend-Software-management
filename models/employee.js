const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeData = new Schema({

    name: String,
    position: String,
    salary: String,
    birthdate: String,
    joindate: String,
    completedate: String,
    increameentdate: String,
    phonenumber: String,
    email: String,
});

module.exports = mongoose.model('Employee', EmployeeData)
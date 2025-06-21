const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminData = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    pass: {
        type: String,
        require: true
    },
    confirmpass: String,
    hiringStatus: String
});

module.exports = mongoose.model('admin', adminData)
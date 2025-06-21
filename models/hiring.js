const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HiringData = new Schema({
    name: String,
    position: String,
    phonenumber: String,
    interviewdate: String,
    remark: String,
    resume: String,
}, {
    timestamps: true 
});

module.exports = mongoose.model('HiringResume', HiringData);

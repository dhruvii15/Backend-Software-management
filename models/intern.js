const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InternData = new Schema({

    name: String,
    position: String,
    birthdate: String,
    joindate: String,
    timeperiod: String,
    phonenumber: String,
    email: String,
});

module.exports = mongoose.model('Intern', InternData)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EvaluationsData = new Schema({
    employeeId: String,
    month: String,
    year: String,
    work: String,
    leave: String,
    time: String,
    behaviour: String,
    evaluatedBy: String,
}, {
    timestamps: true 
});

module.exports = mongoose.model('Evaluations', EvaluationsData);

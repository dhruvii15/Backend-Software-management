const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EvaluationsData = new Schema({
    employeeName: String,
    employeeId: String,
    month: String,
    year: String,
    work: String,
    leave: String,
    time: String,
    overallGrade: String,
    behaviour: String,
    evaluatorRole: String,
}, {
    timestamps: true 
});

module.exports = mongoose.model('Evaluations', EvaluationsData);

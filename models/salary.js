const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SalaryReportData = new Schema({
    pdf: String,
    month: String,
    year: String,
    employees: [
        {
            name: String,
            totalDays: Number,
            present: Number,
            absent: Number,
            weeklyOff: Number,
            totalSalary: Number,
            cutSalary: Number,
            paySalary: Number,
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('SalaryReport', SalaryReportData);

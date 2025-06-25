const EMPLOYEE = require('../models/employee');
const INTERN = require('../models/intern');
const SALARY = require('../models/salary');
const HIRING = require('../models/hiring');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');



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


// Salary
exports.SalaryCreate = async function (req, res, next) {
    try {
        const filePath = path.join(__dirname, '../public/images/salaryreport', req.file.filename);
        const pdfBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(pdfBuffer);
        const lines = data.text.split('\n');

        const employeeLines = lines.filter(line => /^Employee:\s*\d+\s*:/i.test(line.trim()));
        const employees = [];

        for (const line of employeeLines) {
            const nameMatch = line.match(/:\s*\d+\s*:\s*(.*?)\s*Total Days:/i);
            const totalDaysMatch = line.match(/Total Days:\s*(\d+)/i);
            const presentMatch = line.match(/Present:\s*(\d+)/i);
            const absentMatch = line.match(/Absent:\s*(\d+)/i);
            const weeklyOffMatch = line.match(/WeeklyOff:\s*(\d+)/i);

            if (nameMatch) {
                const name = nameMatch[1].trim();

                const employeeRecord = await EMPLOYEE.findOne({ name });

                if (employeeRecord) {
                    const totalDays = totalDaysMatch ? parseInt(totalDaysMatch[1]) : 0;
                    const present = presentMatch ? parseInt(presentMatch[1]) : 0;
                    const absent = absentMatch ? parseInt(absentMatch[1]) : 0;
                    const weeklyOff = weeklyOffMatch ? parseInt(weeklyOffMatch[1]) : 0;

                    const totalSalary = employeeRecord.salary || 0;
                    const perDaySalary = totalDays > 0 ? totalSalary / totalDays : 0;
                    const cutSalary = perDaySalary * absent;
                    const paySalary = totalSalary - cutSalary;

                    employees.push({
                        name,
                        totalDays,
                        present,
                        absent,
                        weeklyOff,
                        totalSalary,
                        cutSalary,
                        paySalary
                    });
                }
            }
        }

        // Check existing salary for same month and year
        const { month, year } = req.body;  // make sure month & year sent from frontend

        const existingSalary = await SALARY.findOne({ month, year });

        if (existingSalary) {
            return res.status(400).json({
                status: 'Fail!',
                message: `Salary for ${month}-${year} already exists.`,
            });
        }

        req.body.pdf = req.file.filename;
        req.body.employees = employees;

        const dataCreate = await SALARY.create(req.body);

        res.status(201).json({
            status: 'Success!',
            message: 'Salary Created Successfully',
            data: dataCreate,
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: 'Fail!',
            message: error.message,
        });
    }
};



exports.SalaryRead = async function (req, res, next) {
    try {
        const dataFind = await SALARY.find()

        res.status(200).json({
            status: "Success!",
            message: "Salary Found Successfully",
            data: dataFind
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        });
    }
};


exports.SalaryUpdate = async function (req, res, next) {
    try {
        if (req.file) {
            const filePath = path.join(__dirname, '../public/images/salaryreport', req.file.filename);
            const pdfBuffer = fs.readFileSync(filePath);
            const data = await pdfParse(pdfBuffer);
            const lines = data.text.split('\n');

            // Find all Employee lines
            const employeeLines = lines.filter(line => /^Employee:\s*\d+\s*:/i.test(line.trim()));
            const employees = [];

            for (const line of employeeLines) {
                const nameMatch = line.match(/:\s*\d+\s*:\s*(.*?)\s*Total Days:/i);
                const totalDaysMatch = line.match(/Total Days:\s*(\d+)/i);
                const presentMatch = line.match(/Present:\s*(\d+)/i);
                const absentMatch = line.match(/Absent:\s*(\d+)/i);
                const weeklyOffMatch = line.match(/WeeklyOff:\s*(\d+)/i);

                if (nameMatch) {
                    const name = nameMatch[1].trim();

                    // Check if employee exists in EMPLOYEE collection
                    const employeeRecord = await EMPLOYEE.findOne({ name });

                    if (employeeRecord) {
                        const totalDays = totalDaysMatch ? parseInt(totalDaysMatch[1]) : 0;
                        const present = presentMatch ? parseInt(presentMatch[1]) : 0;
                        const absent = absentMatch ? parseInt(absentMatch[1]) : 0;
                        const weeklyOff = weeklyOffMatch ? parseInt(weeklyOffMatch[1]) : 0;

                        const totalSalary = employeeRecord.salary || 0;
                        const perDaySalary = totalDays > 0 ? totalSalary / totalDays : 0;
                        const cutSalary = perDaySalary * absent;
                        const paySalary = totalSalary - cutSalary;

                        employees.push({
                            name,
                            totalDays,
                            present,
                            absent,
                            weeklyOff,
                            totalSalary,
                            cutSalary,
                            paySalary
                        });
                    }
                }
            }

            req.body.pdf = req.file.filename;
            req.body.employees = employees;
        }

        const dataUpdate = await SALARY.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(201).json({
            status: "Success!",
            message: "Salary Updated Successfully",
            data: dataUpdate
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Fail!",
            message: error.message
        });
    }
};



exports.SalaryDelete = async function (req, res, next) {
    try {
        let dataDelete = await SALARY.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "Salary Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}



// dashboard
exports.Dashboard = async function (req, res, next) {
    try {
        const hiringCount = await HIRING.countDocuments();
        const employeeCount = await EMPLOYEE.countDocuments();
        const internCount = await INTERN.countDocuments();

        res.status(200).json({
            status: "Success!",
            message: "Data Found Successfully",
            data: {
                hiringCount,
                employeeCount,
                internCount
            }
        });
        
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        });
    }
};
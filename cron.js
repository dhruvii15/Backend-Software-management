const cron = require("node-cron");
const moment = require("moment");
const nodemailer = require("nodemailer");

const employees = [
  {
    name: "Dhruvi",
    phone: "+917383309599",
    birthdate: "1995-06-20",
    email: "dhruvi.plexustechnology@gmail.com"
  }
];

const hrEmail = "hr.plexustechnology@gmail.com";

// Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: hrEmail,
    pass: 'jqzoqbhvhsyhivgm', // App password
  },
});

// Send birthday wish to employee
async function sendWishToEmployee(emp) {
  try {
    const info = await transporter.sendMail({
      from: hrEmail,
      to: emp.email,
      subject: `🎉 Happy Birthday, ${emp.name}!`,
      html: `<p>Dear ${emp.name},</p><p>Wishing you a fantastic birthday filled with joy and success! 🎂🎉</p><p>Best wishes,<br/>HR Team</p>`,
    });
    console.log(`Wish sent to ${emp.name}: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending wish to ${emp.name}:`, error);
  }
}

// Send reminder to HR
async function sendReminderToHR(emp) {
  try {
    const info = await transporter.sendMail({
      from: hrEmail,
      to: hrEmail,
      subject: `Reminder: It's ${emp.name}'s Birthday Today 🎈`,
      html: `<p>Hi HR Team,</p><p>This is a reminder that today is <strong>${emp.name}</strong>'s birthday (${emp.birthdate}).</p><p>🎉 Don’t forget to wish them!</p>`,
    });
    console.log(`Reminder sent to HR for ${emp.name}: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending reminder for ${emp.name}:`, error);
  }
}

// Schedule cron job - Every day at 16:00 (4 PM)
cron.schedule("0 16 * * *", () => {
  const today = moment().format("MM-DD");

  employees.forEach((emp) => {
    const birth = moment(emp.birthdate).format("MM-DD");

    if (birth === today) {
      sendWishToEmployee(emp);
      sendReminderToHR(emp);
    }
  });
});

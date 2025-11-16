const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };
        
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${to}`);
        return true;
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        return false;
    }
};

const sendBookingConfirmation = async (userEmail, bookingDetails) => {
    const subject = 'Booking Confirmation - NyayaSetu';
    const html = `
        <h2>Booking Confirmed!</h2>
        <p>Dear ${bookingDetails.userName},</p>
        <p>Your consultation with <strong>${bookingDetails.lawyerName}</strong> has been confirmed.</p>
        <p><strong>Date:</strong> ${new Date(bookingDetails.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${bookingDetails.startTime}</p>
        <p><strong>Type:</strong> ${bookingDetails.consultationType}</p>
        <p><strong>Amount:</strong> ₹${bookingDetails.amount}</p>
        <p>Thank you for using NyayaSetu!</p>
    `;
    return await sendEmail(userEmail, subject, html);
};

const sendBookingReminder = async (userEmail, bookingDetails) => {
    const subject = 'Consultation Reminder - NyayaSetu';
    const html = `
        <h2>Upcoming Consultation Reminder</h2>
        <p>Dear ${bookingDetails.userName},</p>
        <p>This is a reminder for your consultation with <strong>${bookingDetails.lawyerName}</strong>.</p>
        <p><strong>Date:</strong> ${new Date(bookingDetails.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${bookingDetails.startTime}</p>
        <p>Please be ready 5 minutes before the scheduled time.</p>
    `;
    return await sendEmail(userEmail, subject, html);
};

module.exports = {
    sendEmail,
    sendBookingConfirmation,
    sendBookingReminder
};

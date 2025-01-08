"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            text,
            html,
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};
exports.sendEmail = sendEmail;

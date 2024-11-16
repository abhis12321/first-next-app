import nodemailer from "nodemailer";
import { forgotPasswordMessage } from "./message";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.E_PASS,
    },
  });
  
  export async function sendPasswordToUser({ email, pass }) {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "password forgot",
      text: `Please use this password to login with your email address:\n${pass}\n\nIf you did not request this password, please ignore this message.`,
      html: forgotPasswordMessage({ pass }),
    };
  
    return transporter.sendMail(mailOptions);
  }
  
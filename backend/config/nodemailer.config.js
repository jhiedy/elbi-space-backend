import nodemailer from 'nodemailer';
import { config } from './auth.config.js';

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP credentials 
    port: 465,
    secure: true,
    auth: {
      user: config.user,
      pass: config.pass,
    },
})

// Function to call for sending email confirmation to the user
// Description: Sends an email to the user confirming their signup request
// Tutorial followed: https://betterprogramming.pub/how-to-create-a-signup-confirmation-email-with-node-js-c2fea602872a
const emailConfirmation = (fname, lname, email, confirmationCode) =>{
    transport.sendMail({
        from: `Elbi Space <${config.user}>`,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello, ${fname} ${lname}</h2>
        <p>Thank you for signing up with our service. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3001/api/auth/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};

export { emailConfirmation }
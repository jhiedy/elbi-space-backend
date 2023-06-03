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
        html: `
        <img src = "https://res.cloudinary.com/dxujn4elq/image/upload/v1685784134/header_nle9ps.png" alt="Elbi Space Header"/>
        <h2>Hello, ${fname} ${lname}!</h2>
        <p style="text-align: justify; text-justify: inter-word;">
          Thank you for your interest in signing up to Elbi Space, your home for space discovery around Los Baños.
          We are sending this email to confirm that you have provided your email address as part of the account registration
          process for your Elbi Space account.</p>
        <p style="text-align: justify; text-justify: inter-word;">By clicking the link below, you have read the terms and conditions for this site and your account will be verified.</p>
        <br>
        <a href=https://elbi-space-api.onrender.com/api/auth/confirm/${confirmationCode} style="background-color: #D25525; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Verify Account</a>
        <br>
        <br>
        <img src = "https://res.cloudinary.com/dxujn4elq/image/upload/v1685784134/footer_adfycq.png" alt="Elbi Space Footer"/>
        </div>`,
  }).catch(err => console.log(err));
};

export { emailConfirmation }
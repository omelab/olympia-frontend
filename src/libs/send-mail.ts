'use server';
import { redirect, RedirectType } from 'next/navigation';
import { createTransport } from 'nodemailer';

// read environment variables
const RECEIVING_EMAIL = process.env.RECEIVING_EMAIL as string;
const SENDING_EMAIL = process.env.SENDING_EMAIL as string;
const SENDING_EMAIL_PASSWORD = process.env.SENDING_EMAIL_PASSWORD as string;

// create nodemailer transport for sending email
const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SENDING_EMAIL,
    pass: SENDING_EMAIL_PASSWORD,
  },
});

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;

  const mailOptions = {
    from: { name, address: SENDING_EMAIL },
    to: RECEIVING_EMAIL,
    subject: `${name} | Contact Us`,
    text: message,
    html: `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Page</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000;">Contact Page</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</p>
      </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);

  redirect('/', RedirectType.replace);
}

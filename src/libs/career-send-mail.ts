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

export async function careerSendEmail(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phoneNumber') as string;
  const emailAddress = formData.get('emailAddress') as string;
  const position = formData.get('position') as string;
  const experience = formData.get('experience') as string;
  const cv = formData.get('cv');

  // @ts-expect-error its okay
  const arrayBuffer = await cv.arrayBuffer();

  // eslint-disable-next-line node/prefer-global/buffer
  const fileBuffer = Buffer.from(arrayBuffer);

  // @ts-expect-error its okay
  const fileName = cv.name || 'cv.pdf';

  const mailOptions = {
    from: { name: fullName, address: emailAddress },
    to: RECEIVING_EMAIL,
    subject: `${fullName} | Career`,
    html: `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Career Page</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000;">Career Page</h1>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${emailAddress}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Experience:</strong> ${experience}</p>
       </body>
    </html>
    `,
    attachments: [
      {
        filename: fileName,
        content: fileBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  await transporter.sendMail(mailOptions);

  redirect('/', RedirectType.replace);
}

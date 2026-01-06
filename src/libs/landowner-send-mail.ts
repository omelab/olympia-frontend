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

export async function landOwnerSendEmail(formData: FormData) {
  const locality = formData.get('locality') as string;
  const address = formData.get('address') as string;
  const sizeOfKathas = formData.get('sizeOfKathas') as string;
  const widthOfRoad = formData.get('widthOfRoad') as string;
  const landCategory = formData.get('landCategory') as string;
  const facing = formData.get('facing') as string;
  const attractiveFeature = formData.get('attractiveFeature') as string;

  const nameOfLandowner = formData.get('nameOfLandowner') as string;
  const emailId = formData.get('emailId') as string;
  const contactNumber = formData.get('contactNumber') as string;

  const mailOptions = {
    from: { name: nameOfLandowner, address: emailId },
    to: RECEIVING_EMAIL,
    subject: `${nameOfLandowner} | Landowner`,
    html: `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Landowner Page</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000;">Landowner Page</h1>
        <p><strong>Locality:</strong> ${locality}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Size Of Kathas:</strong> ${sizeOfKathas}</p>
        <p><strong>Width Of Road:</strong> ${widthOfRoad}</p>
        <p><strong>Land Category:</strong> ${landCategory}</p>
        <p><strong>Facing:</strong> ${facing}</p>
        <p><strong>Attractive Feature:</strong> ${attractiveFeature}</p>
        <br>  
        <p><strong>Landowner Name:</strong> ${nameOfLandowner}</p>
        <p><strong>Landowner Email:</strong> ${emailId}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
      </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);

  redirect('/', RedirectType.replace);
}

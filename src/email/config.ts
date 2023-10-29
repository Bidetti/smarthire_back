import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context: any;
}

export const sendEmail = async (options: EmailOptions) => {
  const { to, subject, template, context } = options;
  try {
    // Read the HTML template file
    const html = fs.readFileSync(`dist/email/templates/${template}.hbs`, "utf8");
    // Compile the HTML template with Handlebars
    const compiledHtml = handlebars.compile(html)(context);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT!),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME!,
        pass: process.env.SMTP_PASSWORD!,
      },
    });
    console.log("Transporter created");
    // Send the email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html: compiledHtml,
    });
    console.log(`Message sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.log(`Error occurred. ${error}`);
    return false;
  }
};

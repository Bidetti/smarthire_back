import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import logger from "../config/logger";

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
      auth: {
        user: process.env.SMTP_USERNAME!,
        pass: process.env.SMTP_PASSWORD!,
      },
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
      }
    } as nodemailer.TransportOptions);
    // Send the email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html: compiledHtml,
    }).catch((error) => {
      logger.error(`Error ao enviar o email. ${error.message}`);
    });
  } catch (error) {
    logger.error(`Error ao enviar o email.`, error);
    return false;
  }
};

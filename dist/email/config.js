"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../config/logger"));
const sendEmail = async (options) => {
    const { to, subject, template, context } = options;
    try {
        // Read the HTML template file
        const html = fs_1.default.readFileSync(`dist/email/templates/${template}.hbs`, "utf8");
        // Compile the HTML template with Handlebars
        const compiledHtml = handlebars_1.default.compile(html)(context);
        // Create a Nodemailer transporter
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: true,
                minVersion: "TLSv1.2"
            }
        });
        // Send the email
        const info = await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
            to,
            subject,
            html: compiledHtml,
        }).catch((error) => {
            logger_1.default.error(`Error ao enviar o email. ${error.message}`);
        });
    }
    catch (error) {
        logger_1.default.error(`Error ao enviar o email.`, error);
        return false;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=config.js.map
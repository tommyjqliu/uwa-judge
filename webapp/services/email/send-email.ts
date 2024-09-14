import nodemailer from "nodemailer";

// Send email using SMTP
export async function sendEmail(recipient: string, subject: string, body: string) {
    const smtpAuthUsername = process.env.SMTP_USERNAME;
    const smtpAuthPassword = process.env.SMTP_PASSWORD;
    const sender = process.env.SMTP_SENDER;
    const smtpHostUrl = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT!);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: smtpHostUrl,
        port: smtpPort,
        secure: false, // TLS requires secureConnection to be false
        auth: {
            user: smtpAuthUsername,
            pass: smtpAuthPassword
        }
    });

    // Email message options
    const mailOptions = {
        from: sender,
        to: recipient,
        subject: subject,
        text: body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return info;
}
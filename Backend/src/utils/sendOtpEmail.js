// Send OTP email using nodemailer
import nodemailer from "nodemailer";

const sendOtpEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.MAILTRAP_SMTP_USER,
                pass: process.env.MAILTRAP_SMTP_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: `"Authentication App" <${process.env.SENDER_EMAIL || process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset OTP",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
                    <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${otp}</h1>
                    </div>
                    <p><strong>This OTP will expire in 5 minutes.</strong></p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">This is an automated email. Please do not reply.</p>
                </div>
            `,
            text: `
                Password Reset Request
                
                You have requested to reset your password. Please use the following OTP:
                
                ${otp}
                
                This OTP will expire in 5 minutes.
                
                If you did not request a password reset, please ignore this email.
            `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
};

export default sendOtpEmail;
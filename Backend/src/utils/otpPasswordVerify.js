import { User } from "../models/user.model.js";


export default async function handleVerifyOtpAndResetPassword(req, res) {
    const { email, otp, newPassword, confirmNewPassword } = req.body;

    try {
    
        const user = await User.findOne({ email });

        if (!user) {
            return res.render("resetPassword", {
                userNotFoundMsg : "User not found!"
            })
        }

        // Check if OTP is expired
        if (Date.now() > user.otpExpiry) {
            return res.render("resetPassword", {
                email: email,
                otpExpiredMSg : "OTP has expired"
            })
        }

        // Check if OTP is correct
        if (user.resetOtp !== otp) {
            return res.render("resetPassword", {
                email : email,
                otpIncorrectMsg : "Incorrect OTP"
            })
        }
        
        // Check if new password and confirm password match
        if (newPassword !== confirmNewPassword) {
            return res.render("resetPassword", {
                email : email,
                passwordNotMatchMsg : "Passwrods do not match"
            })
        }

        user.password = newPassword;
        user.resetOtp = undefined;
        user.otpExpiry = undefined; 

        await user.save();
        res.render("resetPassword", {
            passwordResetSuccessMsg : "Password reset successfully. You can login now."
        });
    } catch (error) {
        console.log(error);
        res.render("resetPassword", {
            passwordResetErrorMsg : "Error resetting password."
        });
    }
}
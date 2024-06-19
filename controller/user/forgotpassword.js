const crypto=require('crypto');
const { sendEmail } = require('./emailCtrl');
const User = require('../../models/userModel');
const forgotpassword=async (req, res) => {
    try{
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 600000; // 1 hour
  
    await user.save();
    
    // Send reset password email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const message=`You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
    + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
    + `${resetUrl}\n\n`
    + `This link is valid only for 10 minutes.If you did not request this, please ignore this email and your password will remain unchanged.\n`
    const data = {
        to: user.email,
        text: "Hey User",
        subject: "Password Reset",
        htm: message,
      };
      await sendEmail(data);
      res.status(200).json({ message: 'Email sent.Check your Email'
    ,success:true }  );
    }
    catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}
  module.exports = forgotpassword

  
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const resetpassword=async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    console.log("token",token)

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
   
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    // Update user's password
    user.password = hashPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
  
    await user.save();
  
    res.json({ message: 'Password reset successfully',success: true });
  }
  module.exports = resetpassword
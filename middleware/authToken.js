async function authToken(req, res, next) {
    try {
      if (!req.session.user) {
        return res.status(200).json({
          message: "Please Login...!",
          error: true,
          success: false,
        });
      }
  
      req.userId = req.session.user._id;
  
      next();
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        data: [],
        error: true,
        success: false,
      });
    }
  }
  
  module.exports = authToken;
  
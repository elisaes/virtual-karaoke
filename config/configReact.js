module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
  
    if (!token) {
      return res.status(401).json({
        message: "You don't have access to this page",
      });
    }
  
    try {
      const decoded = jwt.verify(token, "mamamia");
  
      req.user = decoded.user;
      next();
    } catch (err) {
      return res.status(401).json({
        message: "token is not valid!",
      });
    }
  };
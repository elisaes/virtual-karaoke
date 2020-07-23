const checkAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

const checkAdminAuthenticated = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

module.exports = { checkAdminAuthenticated, checkAuthenticated };

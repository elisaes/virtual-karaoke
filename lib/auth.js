const checkAuthenticated = (req, res, next) => {
  console.log("check auth",req.user)
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

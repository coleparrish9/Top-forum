const withAuth = (req, res, next) => {
  console.log("withAuth middleware called");
  if (!req.session.logged_in) {
    res.status(400).redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

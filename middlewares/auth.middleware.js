const authService = require("../services/auth.service");

const checkedIsUserLoggedInOrNot = (req, res, next) => {
  const userToken = req.cookies.uid;
  if (!userToken) return res.redirect("/static/login");
  const _getUserByToken = authService.get(userToken);
  if (!_getUserByToken) return res.redirect("/static/login");
  req.user = _getUserByToken;
  next();
};

const checkAuth = (req, res, next) => {
  const userToken = req.cookies.uid;
  const _getUserByToken = authService.get(userToken);
  req.user = _getUserByToken;
  next();
};

module.exports = { checkedIsUserLoggedInOrNot, checkAuth };

const URL = require("../../models/urlModels/urlModel");

class StaticController {
  constructor() {
    this.urlData = URL;
  }
  renderStaticUI = async (req, res) => {
    if (!req.user) return res.redirect("/static/login");
    const _urlData = await this.urlData.find({ createdBy: req.user._id });
    return res.render("home", {
      url_data: _urlData || [],
      click_count: null,
      short_id: "",
    });
  };
  renderSignUpUI = async (req, res) => {
    return res.render("signup");
  };
  renderLoginUI = async (req, res) => {
    return res.render("login");
  };
}

module.exports = new StaticController();

const userModel = require("../../models/userModels/userModel");
const authService = require("../../services/auth.service");
const { v4: uuidv4 } = require("uuid");

class UserController {
  constructor() {
    this.user = userModel;
  }
  createUserData = async (req, res) => {
    const requiredField = ["firstName", "lastName", "email", "password"];
    const isReqBodyParamsValid = requiredField.every(
      (i) => req.body[i] && req.body[i].trim() !== ""
    );
    if (isReqBodyParamsValid) {
      await this.user.create(req.body);
      return res.redirect("/static");
    } else
      return res.status(400).json({
        status: "failed",
        message: "Bad Request",
      });
  };
  loginUserData = async (req, res) => {
    const requiredField = ["email", "password"];
    const isReqParamsValid = requiredField.every(
      (i) => req.body[i] && req.body[i].trim() !== ""
    );
    if (isReqParamsValid) {
      const isUser = await this.user.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (!isUser) return res.render("login");
      const sessionId = uuidv4();
      authService.set(sessionId, isUser);
      res.cookie("uid", sessionId);
      return res.redirect("/static");
    } else
      return res.status(400).json({
        status: "failed",
        message: "Bad Request",
      });
  };
}

module.exports = new UserController();

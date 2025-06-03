const express = require("express");
const userController = require("../../controllers/userControllers/user.controller");

const router = express.Router();

router.post("/create", userController.createUserData);
router.post("/login", userController.loginUserData);

module.exports = router;

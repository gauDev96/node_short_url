const express = require("express");

const staticController = require("../../controllers/staticControllers/static.controller");

const router = express.Router();

router.get("/", staticController.renderStaticUI);
router.get("/signup", staticController.renderSignUpUI);
router.get("/login", staticController.renderLoginUI);

module.exports = router;

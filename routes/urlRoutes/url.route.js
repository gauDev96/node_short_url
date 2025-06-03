const express = require("express");

const urlController = require("../../controllers/urlControllers/url.controller");

const router = express.Router();

router.get("/:id", urlController.fetchShortUrl);
router
  .route("/")
  .get(urlController.fetchUrlData)
  .post(urlController.createShortUrl);
router.get("/analytics/:id", urlController.fetchUrlAnalytics);

module.exports = router;

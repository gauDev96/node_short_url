const shortid = require("shortid");
const URL = require("../../models/urlModels/urlModel");

class URLController {
  constructor() {
    this.urlData = URL;
  }
  fetchShortUrl = async (req, res) => {
    const id = req.params.id;
    if (id) {
      const existingURLdata = await this.urlData.findOneAndUpdate(
        {
          shortID: id,
        },
        {
          $push: {
            versionHistory: {
              timeStamp: Date.now(),
            },
          },
        }
      );
      if (existingURLdata) {
        return res.redirect(existingURLdata.originalURL);
      } else
        return res.status(404).json({
          status: "failed",
          message: `Unable to find with this ${id} short id`,
        });
    } else
      return res.status(400).json({
        status: "failed",
        message: "Please provide the short id",
      });
  };
  createShortUrl = async (req, res) => {
    const { url } = req.body;
    const shortID = shortid.generate();
    if (url && url !== "") {
      const createURLData = await this.urlData.create({
        originalURL: url,
        shortID: shortID,
        versionHistory: [],
        createdBy: req.user._id,
      });
      if (createURLData) {
        return res.status(201).json({
          status: "success",
          data: createURLData,
          message: "Short url has been created successfully",
        });
      } else
        return res.status(400).json({
          status: "failed",
          message: "Unable to create",
        });
    } else
      return res.status(400).json({
        status: "failed",
        message: "Please provide the url",
      });
  };
  fetchUrlAnalytics = async (req, res) => {
    const id = req.params.id;
    if (!req.user) return res.redirect("/static/login");
    const _urlData = await this.urlData.find({ createdBy: req.user._id });
    if (id) {
      const existingUrlData = await this.urlData.findOne(
        {
          shortID: id,
        },
        {
          versionHistory: 1,
          shortID: 1,
        }
      );
      if (existingUrlData) {
        return res.render("home", {
          url_data: _urlData || [],
          click_count: existingUrlData.versionHistory.length || 0,
          short_id: existingUrlData.shortID,
        });
      } else
        return res.status(404).json({
          status: "failed",
          message: `Unable to find with this ${id} short id`,
        });
    } else
      return res.status(400).json({
        status: "failed",
        message: "Please provide your short id",
      });
  };
  fetchUrlData = async (req, res) => {
    const _urlData = await this.urlData.find({});
    if (_urlData) {
      return res.status(200).json({
        status: "success",
        data: _urlData,
        message: "Data list has been fetched successfully",
      });
    } else
      return res.status(400).json({
        status: "failed",
        message: "Unable to find data",
      });
  };
}

module.exports = new URLController();

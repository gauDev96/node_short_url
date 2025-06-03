const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    originalURL: {
      type: String,
      required: true,
    },
    shortID: {
      type: String,
      required: true,
    },
    versionHistory: [{ timeStamp: { type: Number, default: 0 } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true, versionKey: false }
);

const URL = mongoose.model("shortenurl", urlSchema);

module.exports = URL;

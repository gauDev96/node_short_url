const mongoose = require("mongoose");

const DBConnect = (db_url, db_name) => {
  return mongoose.connect(`${db_url}/${db_name}`);
};

module.exports = { DBConnect };

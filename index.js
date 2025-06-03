require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { DBConnect } = require("./dbConnect");

const urlRoutes = require("./routes/urlRoutes/url.route");
const staticRoutes = require("./routes/staticRoutes/static.route");
const userRoutes = require("./routes/userRoutes/user.route");

const {
  checkedIsUserLoggedInOrNot,
  checkAuth,
} = require("./middlewares/auth.middleware");

const app = express();
const PORT = process.env.PORT;

DBConnect(process.env.DB_CONNECT_URL, process.env.DB_NAME)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("DB connection err", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //form element
app.use(cookieParser());

app.use("/api/URL", checkedIsUserLoggedInOrNot, urlRoutes);
app.use("/static", checkAuth, staticRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

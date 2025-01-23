const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
// const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");

// app.use("/api/user", user);
app.use("/api/product", product);
// app.use("/api/order", order);
// app.use("/api/payment", payment);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

// error middleware
// app.use(errorMiddleware);

module.exports = app;
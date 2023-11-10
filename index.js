const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const corsOptions = require("./config/corsOptions");
const store = new MongoDBStore({
  uri: process.env.DB,
});

const viewRoute = require("./routes/viewRoutes");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const cartRoute = require("./routes/cartRoutes");
const orderRoute = require("./routes/orderRoutes");
const returnRequestRoute = require("./routes/returnRequestRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors(corsOptions));

store.on("error", function (error) {
  console.log(error);
});

app.use("/", viewRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/returnRequest", returnRequestRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

module.exports = app;

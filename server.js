const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config({ path: "./config.env" });
const app = require("./index");

const server = http.createServer(app);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const port = process.env.PORT || 5000;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
    server.listen(port, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION Shuting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

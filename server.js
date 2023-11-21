const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const corsOptions = require("./config/corsOptions");
const { Server } = require("socket.io");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION Shuting down...");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./index");

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  socket.on("removeCartProduct", (data) => {
    socket.broadcast.emit("received_message", data);
  });

  socket.on("cartUpdated", async (data) => {
    socket.broadcast.emit("received_message", data);
  });

  socket.on("decreaseQuantity", async (data) => {
    socket.broadcast.emit("received_message", data);
  });

  socket.on("removeWishlistProduct", async (data) => {
    socket.broadcast.emit("received_wishlist_data", data);
  });
  socket.on("removeAllWishlistProducts", async (data) => {
    socket.broadcast.emit("received_wishlist_data", data);
  });
  socket.on("createWishlistProduct", async (data) => {
    socket.broadcast.emit("received_wishlist_data", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

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

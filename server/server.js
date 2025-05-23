const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res) => {
  res.send("hello");
});

// MongoDB connection and server start
mongoose.set('strictQuery', true);
mongoose
  .connect("mongodb+srv://aayushijainjain23:yGnubsYRYade7wZX@cluster0.s6j1f0m.mongodb.net/") // update if you're using a different DB URL
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => console.log(`App started at ${PORT}...`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

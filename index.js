const express = require("express");
// const path = require("path");
// const userRoute = require("./routes/user_routes");
const authRoutes = require("./modules/auth/routes/auth_routes");
const blogsRoutes = require("./modules/blog/routes/blog_routes");
const todoRoutes = require("./modules/todo/routes/todo_routes");
const { connectToMonogoDb } = require("./connection");

const app = express();
const port = 5000;

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

connectToMonogoDb("mongodb://127.0.0.1:27017/blogify");

app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   return res.render("home");
// });

// app.use("/user", userRoute);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/todos", todoRoutes);
app.use("/images", express.static("public/images"));

app.listen(port, () => {
  console.log(`Server app running on http://localhost:${port}`);
});

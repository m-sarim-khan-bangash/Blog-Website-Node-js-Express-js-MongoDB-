const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connection to mongoDB
const dbURI =
  "mongodb+srv://SarimKhan:test1234@cluster0.lam3j.mongodb.net/NodePractice?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // this middleware is important for posting data
app.use(morgan("dev")); // ye below commented code ka kaam kr de ga, morgan ek 3rd party middleware hai

// browser will hang and will not move to next url we have use next() method.

/* 
app.consoleuse((req, res, next) => {
  .log("new request made");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("****In the next middleware****");
  next();
}); 
*/

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about my new blog",
    body: "more about my new blog",
  });
  blog.save().then((result) => {
    res.send(result).catch((err) => {
      console.log(err);
    });
  });
});

// routes
app.get("/", (req, res) => {
  // const blogs = [
  //   { title: "Title of a Blog", snippet: "Lorem ipsum dolor sit amet conquer" },
  //   { title: "Title of a Blog", snippet: "Lorem ipsum dolor sit amet conquer" },
  //   { title: "Title of a Blog", snippet: "Lorem ipsum dolor sit amet conquer" },
  // ];
  // res.render("index", { title: "Home", blogs });

  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about", { title: "About" });
});

// blog routes
app.use(blogRoutes);

// 404 page - should always be at the bottom beacuse it reads line by line
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

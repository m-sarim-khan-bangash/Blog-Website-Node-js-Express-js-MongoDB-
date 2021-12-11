const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

// Getting all blogs
router.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Getting a specific blog by id
router.get("/single-blog", (req, res) => {
  Blog.findById("61b38288edbe89fbef7fadb3")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/blogs", blogController.blog_index);

// post
router.post("/blogs", blogController.blog_create_post);

router.get("/blogs/create", blogController.blog_create_get); // ye top pe rhy ga wrna render ni ho ga

router.get("/blogs/:id", blogController.blog_details);

// delete
router.delete("/blogs/:id", blogController.blog_delete);

module.exports = router;

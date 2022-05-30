const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/posts
  axios
    .get("http://localhost:3000/api/posts")
    .then(function (response) {
      res.render("posts", { posts: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.new_post = (req, res) => {
  res.render("new_post");
};

exports.view = (req, res) => {
  axios
    .get("http://localhost:3000/api/posts/", {
      params: { id: req.query.id },
    })
    .then(function (postdata) {
      res.render("view", { post: postdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

var Postdb = require("../models/post");

exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new post
  const post = new Postdb({
    title: req.body.title,
    description: req.body.description,
    discordTag: req.body.discordTag,
  });

  // save post in the database
  post
    .save(post)
    .then((data) => {
      //res.send(data)
      res.redirect("/posts");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating a post",
      });
    });
};

// retrieve and return all posts/ retrive and return a single post
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Postdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Post not found with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving post with id " + id });
      });
  } else {
    Postdb.find()
      .then((post) => {
        res.send(post);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retriving post information",
        });
      });
  }
};

exports.view = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Postdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update post with ${id}. Maybe post not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update post information" });
    });
};

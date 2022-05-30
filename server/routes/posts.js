const express = require("express");
const router = express.Router();

const controller = require("../controller/postsController");
const services = require("../services/render");

router.get("/", services.homeRoutes);

router.get("/new-post", services.new_post);
router.get("/view", services.view);

router.post("/api/posts", controller.create);
router.get("/api/posts", controller.find);
router.put("/api/posts/:id", controller.view);

module.exports = router;

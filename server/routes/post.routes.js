const express = require("express");
const auth = require("../middleware/auth.middleware");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Post.find();
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
      });
      await Like.create({ postId: newPost._id, userId: [] });
      res.status(201).send(newPost);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.patch("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    res.send(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.delete("/:postId", auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const removedPost = await Post.findById(postId);
    const commentList = await Comment.find({ ["postId"]: postId });
    const likes = await Like.find({ ["postId"]: postId });

    await removedPost.remove();
    commentList.forEach(async (i) => await i.remove());
    likes[0].remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

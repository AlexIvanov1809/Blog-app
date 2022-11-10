const express = require("express");
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const router = express.Router({ mergeParams: true });

// /api/comments если одинаковые пути то можно так
router
  .route("/")
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      const post = await Post.findById(req.body.postId);
      post.comments.push(req.body.userId);
      await Post.updateOne(
        { _id: post._id },
        {
          comments: post.comments,
        }
      );
      res.status(201).send(newComment);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedComment = await Comment.findById(commentId);
    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove();

      const post = await Post.findById(removedComment.postId);
      const index = post.comments.indexOf(removedComment.userId);
      const newComments = post.comments.filter((v, i) => i !== index);
      await Post.updateOne(
        { _id: post._id },
        {
          comments: newComments,
        }
      );
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

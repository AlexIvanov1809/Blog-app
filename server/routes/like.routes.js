const express = require("express");
const auth = require("../middleware/auth.middleware");
const Like = require("../models/Like");
const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const list = await Like.find();
    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:likeId", auth, async (req, res) => {
  try {
    const { likeId } = req.params;
    const like = await Like.findById(likeId);
    const index = like.userId.findIndex((u) => u === req.body.userId);
    if (index === -1) {
      like.userId.push(req.body.userId);
    } else {
      like.userId = like.userId.filter((u) => u !== req.body.userId);
    }

    await Like.updateOne(
      { _id: like._id },
      {
        userId: like.userId,
      }
    );

    res.send(like);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

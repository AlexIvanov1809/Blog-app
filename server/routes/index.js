const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/user", require("./user.routes"));
router.use("/post", require("./post.routes"));
router.use("/like", require("./like.routes"));

module.exports = router;

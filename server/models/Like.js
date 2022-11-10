const { Schema, model } = require("mongoose");

const schema = new Schema({
  userId: { type: Array, required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

module.exports = model("Like", schema);

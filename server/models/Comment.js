const { Schema, model } = require("mongoose");

const schema = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Number, required: true },
  // На чьей странице находится комментарий
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  // Кто оставил коммент
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Comment", schema);

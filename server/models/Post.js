const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String, required: true },
    shortText: { type: String, required: true },
    fullText: { type: String, required: true },
    createdAt: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("Post", schema);

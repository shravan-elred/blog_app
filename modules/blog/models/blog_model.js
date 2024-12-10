const { model, Schema } = require("mongoose");

const blogModelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const BlogModel = model("blog", blogModelSchema);

module.exports = BlogModel;

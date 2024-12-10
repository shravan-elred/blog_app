const BlogModel = require("../models/blog_model");
const {
  validateCreateBlog,
  validateUpdateBlog,
  validateBlogId,
} = require("../utils/blog_validator");

async function handleGetBlogs(req, res) {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const total = BlogModel.countDocuments().lean();
    const blogs = BlogModel.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    const queries = [total, blogs];
    const result = await Promise.all(queries);
    return res.status(200).json({
      message: "Blogs fetched succesfully",
      total: result[0],
      result: result[1],
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      result: e,
    });
  }
}

async function handleCreateBlog(req, res) {
  try {
    if (!validateCreateBlog(req.body)) {
      return res.status(400).json({
        result: validateCreateBlog.errors,
      });
    }
    const { title, description } = req.body;
    const result = await BlogModel.create({
      title: title,
      description: description,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      message: "Blog created",
      result: result,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      result: e,
    });
  }
}

async function handleUpdateBlog(req, res) {
  try {
    if (!validateUpdateBlog(req.body)) {
      return res.status(400).json({
        result: validateUpdateBlog.errors,
      });
    }
    if (!validateBlogId(req.params)) {
      return res.status(400).json({
        result: validateBlogId.errors,
      });
    }
    const id = req.params.id;
    const { title, description } = req.body;
    const result = await BlogModel.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
      },
      { returnDocument: "after" }
    ).lean();
    return res.status(200).json({
      message: "Blog updated",
      result: result,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      result: e,
    });
  }
}

async function handleDeleteBlog(req, res) {
  try {
    if (!validateBlogId(req.params)) {
      return res.status(400).json({
        result: validateBlogId.errors,
      });
    }
    const id = req.params.id;
    const result = await BlogModel.findByIdAndDelete(id).lean();
    return res.status(200).json({
      message: "Blog deleted",
      result: result,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      result: e,
    });
  }
}

module.exports = {
  handleGetBlogs,
  handleCreateBlog,
  handleUpdateBlog,
  handleDeleteBlog,
};

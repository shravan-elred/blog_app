const { Router } = require("express");
const { authorizeUser } = require("../../auth/middlewares/auth_middleware");
const {
  handleGetBlogs,
  handleCreateBlog,
  handleUpdateBlog,
  handleDeleteBlog,
} = require("../controllers/blog_controller");

const router = Router();

router.use(authorizeUser);

router.route("/").get(handleGetBlogs).post(handleCreateBlog);
router.route("/:id").patch(handleUpdateBlog).delete(handleDeleteBlog);

module.exports = router;

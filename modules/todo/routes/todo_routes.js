const { Router } = require("express");
const { handleGetTodo } = require("../controllers/todo_controller");

const router = Router();

router.get("/", handleGetTodo);

module.exports = router;

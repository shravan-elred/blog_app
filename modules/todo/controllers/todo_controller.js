const axios = require("axios");
const { getTodos, setTodos } = require("../service/todo_redis_service");

async function handleGetTodo(req, res) {
  try {
    const cache = await getTodos();
    if (cache) return res.status(200).json({ result: cache });
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    await setTodos(result);
    return res.status(200).json({ result: result });
  } catch (e) {
    res.status(500).json({ message: e });
  }
}

module.exports = {
  handleGetTodo,
};

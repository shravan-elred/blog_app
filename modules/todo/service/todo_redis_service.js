const redis = require("../../../redis_client");

const todosKey = "todos";

async function getTodos() {
  const jsonString = await redis.get(todosKey);
  if (jsonString) return JSON.parse();
}

async function setTodos(todos) {
  return redis.set(todosKey, JSON.stringify(todos));
}

module.exports = { getTodos, setTodos };

const { verifyToken } = require("../services/token_service");

function authorizeUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ result: "Bearer token is missing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = verifyToken(token);
  req.user = user;
  next();
}

module.exports = { authorizeUser };

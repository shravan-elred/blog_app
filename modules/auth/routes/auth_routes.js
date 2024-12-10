const { Router } = require("express");
const {
  handleUserSignIn,
  handleUserSignUp,
} = require("../controllers/auth_controller");

const router = Router();

router.post("/sign-up", handleUserSignUp);
router.post("/sign-in", handleUserSignIn);

module.exports = router;

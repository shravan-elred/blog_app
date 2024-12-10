const { Router } = require("express");
const UserModel = require("../models/user_model");

const { createToken } = require("../services/auth");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    await UserModel.create({
      fullName: fullName,
      email: email,
      password: password,
    });
    return res.redirect("/");
  } catch (e) {
    console.error(e);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.matchPassword({
      email: email,
      password: password,
    });
    const token = createToken(user);
    console.log("token : ", token);
    return res.redirect("/");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;

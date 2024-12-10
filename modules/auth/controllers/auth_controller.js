const { Router } = require("express");
const { validateSignIn, validateSignUp } = require("../utils/user_validator");
const UserModel = require("../models/user_model");
const { createToken } = require("../services/token_service");

async function handleUserSignIn(req, res) {
  try {
    if (!validateSignIn(req.body)) {
      return res.status(400).json({
        result: validateSignIn.errors,
      });
    }
    const { email, password } = req.body;
    const user = await UserModel.matchPassword({
      email: email,
      password: password,
    });
    const token = createToken(user);
    return res.status(200).json({
      message: "Signin success",
      result: {
        token: token,
        user: user,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      result: e,
    });
  }
}

async function handleUserSignUp(req, res) {
  try {
    if (!validateSignUp(req.body)) {
      return res.status(400).json({
        result: validateSignUp.errors,
      });
    }
    const { fullName, email, password } = req.body;
    const user = await UserModel.create({
      fullName: fullName,
      email: email,
      password: password,
    });
    return res.status(200).json({
      message: "Account created",
      result: {
        ...user._doc,
        password: undefined,
        salt: undefined,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      result: e,
    });
  }
}

module.exports = { handleUserSignIn, handleUserSignUp };

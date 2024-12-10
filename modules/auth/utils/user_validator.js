const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const signUpUserSchema = {
  type: "object",
  properties: {
    fullName: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["fullName", "email", "password"],
  additionalProperties: false,
};

const signInUserSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const validateSignUp = ajv.compile(signUpUserSchema);
const validateSignIn = ajv.compile(signInUserSchema);

module.exports = { validateSignUp, validateSignIn };

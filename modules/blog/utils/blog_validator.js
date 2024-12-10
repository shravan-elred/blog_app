const Ajv = require("ajv");

const ajv = new Ajv();

const blogCreateSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 3,
    },
    description: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["title"],
  additionalProperties: false,
};

const blogUpdateSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 3,
    },
    description: {
      type: "string",
      minLength: 1,
    },
  },
  required: [],
  additionalProperties: false,
};

const blogIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      minLength: 24,
      maxLength: 24,
    },
  },
  required: ["id"],
  additionalProperties: false,
};

const validateCreateBlog = ajv.compile(blogCreateSchema);
const validateUpdateBlog = ajv.compile(blogUpdateSchema);
const validateBlogId = ajv.compile(blogIdSchema);

module.exports = { validateCreateBlog, validateUpdateBlog, validateBlogId };

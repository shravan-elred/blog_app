const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userModelSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default_profile_image.png",
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

userModelSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userModelSchema.static("matchPassword", async function ({ email, password }) {
  const user = await this.findOne({ email: email }).lean();
  if (!user) throw new Error("User not found!");

  const salt = user.salt;
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== user.password) throw new Error("Incorrect password");
  return { ...user, password: undefined, salt: undefined };
});

const UserModel = model("user", userModelSchema);

module.exports = UserModel;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      unique: true,
      required: [true, "Password is required"],
    },
    /* Friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  Requests: [
    {
      by: {
        type: String,
        enum: ["ME", "OTHER"],
        default: "ME",
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  Rejected: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ], */
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);

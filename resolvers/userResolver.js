const JsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = require("../models/Users");

const signUpResolver = async (parent, args, ...URLSearchParams) => {
  const hashed = await bcrypt.hash(args.password, 10);
  try {
    const user = await Users.create({
      userName: args.userName,
      password: hashed,
    });
    user.jwtToken = JsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const signInResolver = async (paraent, args) => {
  try {
    const user = await Users.findOne({
      userName: args.userName,
    });
    if (user) {
      const checkPassword = await bcrypt.compare(args.password, user.password);
      if (checkPassword) {
        user.jwtToken = JsonWebToken.sign(
          { id: user._id },
          process.env.JWT_SECRET
        );
        return user;
      } else {
        throw new Error("Password is Invalid");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  signUpResolver,
  signInResolver,
};

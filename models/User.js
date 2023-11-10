const mongoose = require("mongoose");
const validator = require("validator");
const { isStrongPassword, isEmail } = validator;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can't be empty"],
    maxLength: [20, "Maximum characters limit of 20 is exceeded"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Can't be empty"],
    maxLength: 20,
    validate: {
      validator: (usernameStr) => {
        if (usernameStr.search(/\s/) !== -1){
          throw new Error("Username can't include a space");
        }
        return true;
      }
    },
  },
  email: {
    type: String,
    required: [true, "Can't be empty"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (emailStr) => {
        if (!isEmail(emailStr)){
          throw new Error("Email is not valid");
        }
        return true;
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (passwordStr) => {
        if (!isStrongPassword(passwordStr)) {
          throw new Error("Password is weak");
        }
        return true;
      }
    }
  },
  activated: {
    type: Boolean,
    default: false,
  },
  newsHistory: {
    type: [mongoose.Types.ObjectId],
    ref: "News",
  },
}, {timestamps: true});


module.exports = mongoose.model("User", userSchema, "Users");

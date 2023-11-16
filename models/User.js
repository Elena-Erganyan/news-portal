const mongoose = require("mongoose");
const validator = require("validator");
const { isStrongPassword, isEmail } = validator;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Не может быть пустым"],
    maxLength: [20, "Превышен лимит в 20 символов"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Не может быть пустым"],
    maxLength: 20,
    validate: {
      validator: (usernameStr) => {
        if (usernameStr.search(/\s/) !== -1){
          throw new Error("Юзернейм не должен содержать пробел");
        }
        return true;
      }
    },
  },
  email: {
    type: String,
    required: [true, "Не может быть пустым"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (emailStr) => {
        if (!isEmail(emailStr)){
          throw new Error("Введённые данные не являются корректным адресом электронной почты");
        }
        return true;
      }
    }
  },
  password: {
    type: String,
    required: [true, "Не может быть пустым"],
    validate: {
      validator: (passwordStr) => {
        if (!isStrongPassword(passwordStr)) {
          throw new Error("Ненадёжный пароль");
        }
        return true;
      }
    }
  },
  activated: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});


module.exports = mongoose.model("User", userSchema, "Users");

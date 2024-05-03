"use strict";

const bcrypt = require("bcrypt");

const setPassword = async function (password, saltRounds = 12) {
  try {
    salt = await bcrypt.genSalt(saltRounds);
    hash = await bcrypt.hash(password, salt);
    return (this.delete_password = hash);
  } catch (err) {
    console.error(err);
  }
};

const validatePassword = async function (password) {
  try {
    const isPasswordValid = await bcrypt.compare(
      password,
      this.delete_password
    );
    return isPasswordValid;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  setPassword: setPassword,
  validatePassword: validatePassword,
};

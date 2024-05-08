'use strict';

const { User } = require('../models/index.js'); // Corrected import

async function handleSignup(req, res, next) {
  console.log(req);
  try {
    let userRecord = await User.create(req.body); // Corrected to use User instead of users
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(200).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await User.findAll({}); // Corrected to use User instead of users
    const list = userRecords.map(user => user.username); // Changed users to userRecords
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
};

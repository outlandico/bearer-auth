const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const userSchema = require('./users');

const User = userSchema(sequelize, DataTypes);

module.exports = User; // Export the User model

'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username });
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10); // Await bcrypt.hash
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } }); // Corrected findOne syntax
    if (!user) throw new Error('Invalid User');
    const valid = await bcrypt.compare(password, user.password);
    if (valid) return user;
    throw new Error('Invalid Password');
  };

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = await this.findOne({ where: { username: parsedToken.username } }); // Corrected findOne syntax
      if (user) return user;
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userSchema; // Export userSchema only

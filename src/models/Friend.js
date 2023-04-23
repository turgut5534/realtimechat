const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql')

const User = require('./User'); // assuming you have already defined the User model

const Friend = sequelize.define('friend', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Friend;
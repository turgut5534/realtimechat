const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql')

const Friendship = sequelize.define('Friendship', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  });

module.exports = Friendship
const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql')

const Room = sequelize.define('Room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Room
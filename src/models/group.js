const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql')

const Group = sequelize.define('Group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Group
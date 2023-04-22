const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql')

const GroupMember = sequelize.define('GroupMember', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = GroupMember
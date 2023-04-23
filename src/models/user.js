const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql')
const Friend = require('./Friend')
const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  
User.hasMany(Friend, { foreignKey: 'user_id' });
Friend.belongsTo(User, { foreignKey: 'user_id' });
Friend.belongsTo(User, { foreignKey: 'friend_id' });

// sequelize.sync()

module.exports = User;
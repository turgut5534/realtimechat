const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql')
const Group = require('./group')
const GroupMember = require('./groupMember')
const Friendship = require('./friendship')
const Message = require('./message')
const Room = require('./room')

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
});

User.belongsToMany(User, { through: Friendship, as: 'friends' });
User.belongsToMany(Group, { through: GroupMember, as: 'groups' });
Group.belongsToMany(User, { through: GroupMember, as: 'members' });
Message.belongsTo(User, { as: 'sender' });
Message.belongsTo(User, { as: 'receiver' });
Message.belongsTo(Group);
Room.belongsTo(User, { as: 'user_1' })
Room.belongsTo(User, { as: 'user_2' })

// sequelize.sync()

module.exports = User
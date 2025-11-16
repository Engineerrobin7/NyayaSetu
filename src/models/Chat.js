const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Lawyer = require('./Lawyer');

const Chat = sequelize.define('Chat', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: 'id' } },
    lawyerId: { type: DataTypes.UUID, allowNull: false, references: { model: Lawyer, key: 'id' } },
    message: { type: DataTypes.TEXT, allowNull: false },
    sender: { type: DataTypes.ENUM('user', 'lawyer'), allowNull: false }
}, { timestamps: true });

module.exports = Chat;

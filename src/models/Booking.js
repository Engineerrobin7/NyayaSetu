const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Booking = sequelize.define("Booking", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    lawyerId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: true },
    endTime: { type: DataTypes.TIME, allowNull: true },
    status: { type: DataTypes.STRING, defaultValue: "pending" }, // pending, confirmed, completed, cancelled
    consultationType: { type: DataTypes.STRING, allowNull: true }, // chat, call, video
    notes: { type: DataTypes.TEXT, allowNull: true },
    paymentStatus: { type: DataTypes.STRING, defaultValue: "pending" }, // pending, paid, refunded
    amount: { type: DataTypes.INTEGER, allowNull: true },
}, {
    timestamps: true,
    underscored: true
});

module.exports = Booking;

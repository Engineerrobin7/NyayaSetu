const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Availability = sequelize.define("Availability", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    lawyerId: { type: DataTypes.UUID, allowNull: false },
    dayOfWeek: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0, max: 6 } }, // 0=Sunday, 6=Saturday
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    timestamps: true,
    underscored: true
});

module.exports = Availability;

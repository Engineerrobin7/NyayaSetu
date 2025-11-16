const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lawyer = sequelize.define("Lawyer", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    specialization: { type: DataTypes.STRING, allowNull: true },
    experience: { type: DataTypes.INTEGER, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    consultationFee: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    profileImage: { type: DataTypes.STRING(500), allowNull: true },
    licenseNumber: { type: DataTypes.STRING(100), allowNull: true },
    rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0 },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    tableName: "Lawyers",
    timestamps: true,
    underscored: false
});

module.exports = Lawyer;

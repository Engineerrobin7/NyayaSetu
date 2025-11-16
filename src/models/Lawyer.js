const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lawyer = sequelize.define("Lawyer", {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    specialization: { type: DataTypes.STRING, allowNull: false },
    experience: { type: DataTypes.INTEGER, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    fees: { type: DataTypes.INTEGER, allowNull: false },
    bio: { type: DataTypes.TEXT, allowNull: true },
    profileImage: { type: DataTypes.STRING, allowNull: true },
    barCouncilId: { type: DataTypes.STRING, allowNull: true },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    totalReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    tableName: "lawyers",
    timestamps: true,
    underscored: true
});

module.exports = Lawyer;

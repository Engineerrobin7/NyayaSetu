const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Document = sequelize.define("Document", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    bookingId: { type: DataTypes.UUID, allowNull: true },
    fileName: { type: DataTypes.STRING, allowNull: false },
    fileUrl: { type: DataTypes.STRING, allowNull: false },
    fileType: { type: DataTypes.STRING, allowNull: false },
    fileSize: { type: DataTypes.INTEGER, allowNull: false },
    documentType: { type: DataTypes.STRING, allowNull: true }, // case_document, generated_document, etc.
}, {
    timestamps: true,
    underscored: true
});

module.exports = Document;

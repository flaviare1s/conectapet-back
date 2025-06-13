import { DataTypes } from "sequelize";
import { connection } from "../config/database.js";

export const PendingUser = connection.define("PendingUser", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeExpiration: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

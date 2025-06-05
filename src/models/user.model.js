import { DataTypes } from "sequelize";
import { connection } from "../config/database.js";

export const User = connection.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "guardian"),
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // valor padrão: false
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true, // pode ser null até o usuário solicitar verificação
    },
    codeExpiration: {
      type: DataTypes.DATE,
      allowNull: true, // pode ser null até o usuário solicitar verificação
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

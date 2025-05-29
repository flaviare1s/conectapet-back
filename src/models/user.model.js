import { DataTypes } from "sequelize";
import { connection } from "../config/database.js";

export const User = connection.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'guardian'),
    allowNull: false,
  }
})

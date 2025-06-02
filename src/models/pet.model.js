import { DataTypes } from "sequelize";
import { connection } from "../config/database.js";

export const Pet = connection.define(
  "pet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagem: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    idade: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    tipo: {
      type: DataTypes.ENUM("cachorro", "gato"),
      allowNull: false,
    },
    responsavel: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    guardianId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    sexo: {
      type: DataTypes.ENUM("macho", "fêmea"),
      allowNull: true,
    },
    porte: {
      type: DataTypes.ENUM("pequeno", "médio", "grande"),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Coração livre!", "Quase lá!", "Final feliz!"),
      allowNull: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    castrado: {
      type: DataTypes.ENUM("sim", "não"),
      allowNull: true,
    },
    vacinado: {
      type: DataTypes.ENUM("sim", "não"),
      allowNull: true,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

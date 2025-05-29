import { DataTypes } from "sequelize";
import { connection } from "../config/database.js";

export const Adoption = connection.define(
  "adoption",
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
    dataN: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ec: {
      type: DataTypes.ENUM("solteiro", "casado", "divorciado", "viúvo"),
      allowNull: false,
    },
    profissao: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cel: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    rua: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    termo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    custos: {
      type: DataTypes.ENUM("sim", "não"),
      allowNull: false,
    },
    compromisso: {
      type: DataTypes.ENUM("sim", "não"),
      allowNull: false,
    },
    visitas: {
      type: DataTypes.ENUM("sim", "não"),
      allowNull: false,
    },
    motivacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    petName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    guardianId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    guardianName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    guardianEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    userEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

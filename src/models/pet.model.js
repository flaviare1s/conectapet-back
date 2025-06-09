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
    tipo: {
      type: DataTypes.ENUM("cachorro", "gato"),
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    idade: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Coração livre!", "Quase lá!", "Final feliz!"),
      allowNull: false,
    },
    porte: {
      type: DataTypes.ENUM("pequeno", "médio", "grande"),
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM("macho", "fêmea"),
      allowNull: false,
    },
    vacinado: {
      type: DataTypes.ENUM("sim", "não"),
      allowNull: false,
    },
    castrado: {
      type: DataTypes.ENUM("sim", "não"),
      allowNull: false,
    },
    guardianId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

Pet.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  if (values.createdAt) {
    values.createdAt = new Date(values.createdAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  }
  if (values.updatedAt) {
    values.updatedAt = new Date(values.updatedAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  }
  return values;
};

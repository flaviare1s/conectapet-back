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
      type: DataTypes.ENUM("solteiro", "casado", "divorciado", "viuvo"),
      allowNull: false,
    },
    profissao: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cel: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    rua: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    favoritado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },    
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pets",
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

Adoption.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  if (values.createdAt) {
    values.createdAt = new Date(values.createdAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  }
  if (values.updatedAt) {
    values.updatedAt = new Date(values.updatedAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  }
  return values;
};

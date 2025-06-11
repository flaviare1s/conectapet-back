import { config } from "dotenv";
config(); // carrega .env ou .env.test

import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";

let sequelize;

if (env === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT || "mysql",
      logging: false,
    }
  );
}

export const connection = sequelize;

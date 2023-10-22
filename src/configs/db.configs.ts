import * as dotenv from "dotenv";
import { SequelizeOptions } from "sequelize-typescript";
import { models } from "../models";
dotenv.config();

export const databaseConfig: SequelizeOptions = {
	dialect: "postgres",
	port: Number(process.env.DB_PORT),
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
	models: models,
	logging: false,
	dialectOptions: { useUTC: false },
	timezone: "Asia/Tashkent",
};

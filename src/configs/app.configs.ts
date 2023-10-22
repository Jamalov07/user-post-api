import * as dotenv from "dotenv";
import { AppConfigOptions } from "../interfaces";
dotenv.config();

export const appConfig: AppConfigOptions = {
	port: Number(process.env.PORT) || 4000,
	host: process.env.HOST || "127.0.0.1",
};

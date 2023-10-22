import * as dotenv from "dotenv";
dotenv.config();

export const tokenConfig = {
	accessTime: process.env.ACCESS_TIME,
	refreshTime: process.env.REFRESH_TIME,
	accessKey: process.env.ACCESS_KEY,
	refreshKey: process.env.REFRESH_KEY,
};

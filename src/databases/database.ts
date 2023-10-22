import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../configs";

export class Database {
	public sequelize: Sequelize | undefined;

	constructor() {
		this.connection();
	}

	private async connection(): Promise<void> {
		try {
			this.sequelize = new Sequelize(databaseConfig);
			await this.sequelize.authenticate();
			await this.sequelize.sync();
			console.log("Database Connected!");
		} catch (error) {
			console.log("\nUnable to connect to the database\n\n", error);
		}
	}
}

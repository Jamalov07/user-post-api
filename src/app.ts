import express from "express";
import { IRouter } from "./interfaces";
import { Database } from "./databases";
import { authMiddleware, errorMiddleware } from "./middlewares";
import cors from "cors";
import { appConfig } from "./configs";
export class App {
	private app: express.Application;
	public port: number;
	private db: Database;

	constructor(routes: IRouter[]) {
		this.app = express();
		this.connection_to_databases();
		this.listen();
		this.init_middlewares();
		this.init_routes(routes);
		this.app.use(errorMiddleware);
	}

	private init_routes(routes: IRouter[]) {
		routes.forEach((route: IRouter) => {
			this.app.use("/", route.router);
		});
	}
	private init_middlewares() {
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(authMiddleware);
	}
	private init_swagger() {}
	private connection_to_databases() {
		this.db = new Database();
	}
	public listen() {
		this.port = appConfig.port;
		this.app.listen(this.port, () => {
			console.log("Server listening on port " + this.port);
		});
	}
}

import { Router } from "express";
import { UserController } from "../controllers";
import { perMiddleware } from "../middlewares";

export class UserRoute {
	#userRoute: UserController;
	path: string;
	router = Router();
	constructor(path: string) {
		this.#userRoute = new UserController();
		this.path = `/${path}/`;
		this.init_routes();
	}
	private init_routes() {
		this.router.get(`${this.path}`, this.#userRoute.GET_ALL);
		this.router.get(`${this.path}:id`, this.#userRoute.GET_ONE);
		this.router.post(`${this.path}`, this.#userRoute.CREATE);
		this.router.post(`${this.path}login`, this.#userRoute.LOGIN);
		this.router.patch(`${this.path}:id`, perMiddleware, this.#userRoute.UPDATE);
		this.router.delete(`${this.path}:id`, perMiddleware, this.#userRoute.DELETE);
	}
}

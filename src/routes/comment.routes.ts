import { Router } from "express";
import { CommentController } from "../controllers";
import { perMiddleware } from "../middlewares";

export class CommentRoute {
	#commentRoute: CommentController;
	path: string;
	router = Router();
	constructor(path: string) {
		this.#commentRoute = new CommentController();
		this.path = `/${path}/`;
		this.init_routes();
	}
	private init_routes() {
		this.router.get(`${this.path}`, this.#commentRoute.GET_ALL);
		this.router.get(`${this.path}:id`, this.#commentRoute.GET_ONE);
		this.router.post(`${this.path}`, this.#commentRoute.CREATE);
		this.router.patch(`${this.path}:id`, perMiddleware, this.#commentRoute.UPDATE);
		this.router.delete(`${this.path}:id`, perMiddleware, this.#commentRoute.DELETE);
	}
}

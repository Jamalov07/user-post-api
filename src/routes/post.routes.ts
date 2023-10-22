import { Router } from "express";
import { PostController } from "../controllers";
import { perMiddleware } from "../middlewares/";

export class PostRoute {
	#postRoute: PostController;
	path: string;
	router = Router();
	constructor(path: string) {
		this.#postRoute = new PostController();
		this.path = `/${path}/`;
		this.init_routes();
	}
	private init_routes() {
		this.router.get(`${this.path}`, this.#postRoute.GET_ALL);
		this.router.get(`${this.path}:id`, this.#postRoute.GET_ONE);
		this.router.post(`${this.path}`, this.#postRoute.CREATE);
		this.router.patch(`${this.path}:id`, perMiddleware, this.#postRoute.UPDATE);
		this.router.delete(`${this.path}:id`, perMiddleware, this.#postRoute.DELETE);
	}
}

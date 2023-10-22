import { HttpException } from "../exceptions";
import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces";
import { CommentService, PostService } from "../services";
import { ClassValidator } from "../validations";
import { CommentGetOneDto, PostGetOneDto } from "../dtos";

class PersonalMiddleware {
	#postService: PostService;
	#commentService: CommentService;
	constructor(req: RequestWithUser, res: Response, next: NextFunction) {
		this.#commentService = new CommentService();
		this.#postService = new PostService();
		this.check(req, res, next);
	}

	async check(req: RequestWithUser, res: Response, next: NextFunction) {
		if (req.url.slice(0, 5) === "/user" && req.method !== "GET") {
			console.log("user");
			if (req.user.id !== req.params.id) {
				next(new HttpException(400, "Not allowed"));
			}
			next();
		} else if (req.url.slice(0, 5) === "/post" && req.method !== "GET") {
			console.log("post");
			const post = await this.#postService.get_one(await ClassValidator(req.params, PostGetOneDto));
			if (post.dataValues.user_id !== req.user.id) {
				next(new HttpException(400, "Not allowed"));
			}
			next();
		} else if (req.url.slice(0, 8) === "/user" && req.method !== "GET") {
			console.log("comment");
			const comment = await this.#commentService.get_one(await ClassValidator(req.params, CommentGetOneDto));
			if (comment.dataValues.user_id !== req.user.id) {
				next(new HttpException(400, "Not allowed"));
			}
			next();
		}
	}
}

export const perMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
	return new PersonalMiddleware(req, res, next);
};

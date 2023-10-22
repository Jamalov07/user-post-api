import { Request, Response, NextFunction } from "express";
import { ClassValidator } from "../validations";
import { PostService } from "../services";
import { PostCreateDto, PostDeleteDto, PostGetAllDto, PostGetOneDto, PostUpdateDto } from "../dtos";
import { RequestWithUser } from "../interfaces";

export class PostController {
	#postService: PostService;
	constructor() {
		this.#postService = new PostService();
	}

	GET_ALL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#postService.get_all(await ClassValidator(req.query, PostGetAllDto)));
		} catch (error) {
			next(error);
		}
	};

	GET_ONE = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#postService.get_one(await ClassValidator(req.params, PostGetOneDto)));
		} catch (error) {
			next(error);
		}
	};

	CREATE = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#postService.create(await ClassValidator({ ...req.body, user_id: req.user.id }, PostCreateDto)));
		} catch (error) {
			next(error);
		}
	};

	UPDATE = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#postService.update(await ClassValidator(req.params, PostGetOneDto), await ClassValidator({ ...req.body, user_id: req.user.id }, PostUpdateDto)));
		} catch (error) {
			next(error);
		}
	};

	DELETE = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#postService.delete(await ClassValidator(req.params, PostDeleteDto)));
		} catch (error) {
			next(error);
		}
	};
}

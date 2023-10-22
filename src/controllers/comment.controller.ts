import { Request, Response, NextFunction } from "express";
import { ClassValidator } from "../validations";
import { CommentService } from "../services";
import { CommentCreateDto, CommentDeleteDto, CommentGetAllDto, CommentGetOneDto, CommentUpdateDto } from "../dtos";
import { RequestWithUser } from "../interfaces";

export class CommentController {
	#commentService: CommentService;
	constructor() {
		this.#commentService = new CommentService();
	}

	GET_ALL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#commentService.get_all(await ClassValidator(req.query, CommentGetAllDto)));
		} catch (error) {
			next(error);
		}
	};

	GET_ONE = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#commentService.get_one(await ClassValidator(req.params, CommentGetOneDto)));
		} catch (error) {
			next(error);
		}
	};

	CREATE = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#commentService.create(await ClassValidator({ ...req.body, user_id: req.user.id }, CommentCreateDto)));
		} catch (error) {
			next(error);
		}
	};

	UPDATE = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(
				await this.#commentService.update(await ClassValidator(req.params, CommentGetOneDto), await ClassValidator({ ...req.body, user_id: req.user.id }, CommentUpdateDto))
			);
		} catch (error) {
			next(error);
		}
	};

	DELETE = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#commentService.delete(await ClassValidator(req.params, CommentDeleteDto)));
		} catch (error) {
			next(error);
		}
	};
}

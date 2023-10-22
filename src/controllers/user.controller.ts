import { Request, Response, NextFunction } from "express";
import { ClassValidator } from "../validations";
import { UserService } from "../services";
import { UserCreateDto, UserDeleteDto, UserGetAllDto, UserGetOneDto, UserLoginDto, UserUpdateDto } from "../dtos";

export class UserController {
	#userService: UserService;
	constructor() {
		this.#userService = new UserService();
	}

	GET_ALL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#userService.get_all(await ClassValidator(req.query, UserGetAllDto)));
		} catch (error) {
			next(error);
		}
	};

	GET_ONE = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#userService.get_one(await ClassValidator(req.params, UserGetOneDto)));
		} catch (error) {
			next(error);
		}
	};

	CREATE = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#userService.create(await ClassValidator(req.body, UserCreateDto)));
		} catch (error) {
			next(error);
		}
	};

	UPDATE = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#userService.update(await ClassValidator(req.params, UserGetOneDto), await ClassValidator(req.body, UserUpdateDto)));
		} catch (error) {
			next(error);
		}
	};

	DELETE = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#userService.delete(await ClassValidator(req.params, UserDeleteDto)));
		} catch (error) {
			next(error);
		}
	};

	LOGIN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			res.json(await this.#userService.login(await ClassValidator(req.body, UserLoginDto)));
		} catch (error) {
			next(error);
		}
	};
}

import { HttpException } from "../exceptions";
import { NextFunction, Response } from "express";
import { JWTService, UserService } from "../services";
import { RequestWithUser } from "../interfaces";
import { ClassValidator } from "../validations";
import { UserGetOneDto } from "../dtos";

class AuthMiddleware {
	#jwtService: JWTService;
	#userService: UserService;
	constructor(req: RequestWithUser, res: Response, next: NextFunction) {
		this.#jwtService = new JWTService();
		this.#userService = new UserService();
		this.check(req, res, next);
	}

	async check(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const url = req.url;
			console.log(url);
			if (req.method === "GET") {
				return next();
			} else if ((req.url === "/user" || req.url === "/user/login") && req.method === "POST") {
				return next();
			}
			const authorization = req.headers.authorization;
			if (!authorization) {
				return next(new HttpException(401, "Authorization not provided"));
			}
			const token = authorization.split(" ")[1];
			if (!token) {
				return next(new HttpException(401, "Token not found"));
			}
			const user: any = await this.#jwtService.decodeToken(token);
			if (!user.id) {
				return next(new HttpException(401, "No ID in User"));
			}
			await this.#userService.get_one(await ClassValidator({ id: user.id }, UserGetOneDto)).catch((error: Error) => {
				next(new HttpException(400, error.message));
			});
			req.user = user;
			next();
		} catch (error) {
			return next(new HttpException(401, error.message || "Internal Server Error"));
		}
	}
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
	return new AuthMiddleware(req, res, next);
};

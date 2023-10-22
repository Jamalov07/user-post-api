import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";

class ErrorMiddleware {
	constructor(error: HttpException, req: Request, res: Response, next: NextFunction) {
		this.catch(error, req, res, next);
	}
	async catch(error: HttpException, req: Request, res: Response, next: NextFunction) {
		try {
			console.log(error);
			const status: number = error.status || 500;
			const message: string = error.message || "Unhandled error";
			res.status(status).json({ status: status, message: message });
		} catch (error) {
			console.log(error);
			res.status(500).json({ status: 500, message: "Internal server error" });
		}
	}
}

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
	return new ErrorMiddleware(error, req, res, next);
};

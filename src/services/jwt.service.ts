import jwt from "jsonwebtoken";
import { HttpException } from "../exceptions";
import { ITokens, TokenOptions } from "../interfaces/jwt.interface";
import { tokenConfig } from "../configs";

export class JWTService {
	private jwt: typeof jwt = jwt;

	async getTokens(data: TokenOptions): Promise<ITokens> {
		const [access, refresh]: string[] = await Promise.all([
			this.jwt.sign(data, tokenConfig.accessKey, { expiresIn: tokenConfig.accessTime }),
			this.jwt.sign(data, tokenConfig.refreshKey, { expiresIn: tokenConfig.refreshTime }),
		]);
		return { access, refresh };
	}

	async decodeToken(token: string): Promise<any> {
		try {
			const data: any = await this.jwt.verify(token, tokenConfig.accessKey);
			if (!data) {
				throw new HttpException(404, "No information in token");
			}

			return data;
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				throw new HttpException(401, "Token has expired");
			} else if (error.name === "JsonWebTokenError") {
				throw new HttpException(401, "Invalid token");
			} else {
				throw new HttpException(401, "Token verification failed");
			}
		}
	}
}

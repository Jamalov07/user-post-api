import { Request } from "express";
import { IUser } from "./user.interfaces";

export declare interface RequestWithUser extends Request {
	user: Pick<IUser.Default, "id">;
}

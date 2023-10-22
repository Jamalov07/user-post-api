import { User } from "./../models/user.model";
import { FilterDto, PaginationDto, SearchDto, SortDto } from "../dtos";

export declare namespace IUser {
	export interface Default {
		id: string;
		name: string;
		phone_number: string;
		password: string;
		info: string;
		created_at?: Date;
		updated_at?: Date;
	}
	export namespace Req {
		export interface GetAll {
			pagination?: PaginationDto;
			search?: SearchDto;
			filter?: FilterDto;
			sort?: SortDto;
		}
		export type GetOne = Pick<Default, "id">;
		export type Create = Omit<Default, "id" | "created_at" | "updated_at">;
		export type Update = Omit<Default, "id" | "created_at" | "updated_at">;
		export type Delete = Pick<Default, "id">;
		export type Login = Pick<Default, "phone_number" | "password">;
	}
	export namespace Res {
		export type GetAll = { total: number; data: Default[]; pages: number };
		export type GetOne = User;
		export type Create = User;
		export type Update = User;
		export type Delete = { message: string };
		export type Login = { tokens: { access: string; refresh: string }; user: Partial<User> };
	}
}

export declare interface IUserService {}
export declare interface IUserController {}
export declare interface IUserRoute {}

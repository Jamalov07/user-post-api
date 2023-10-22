import { FilterDto, PaginationDto, SearchDto, SortDto } from "../dtos";
import { Post } from "../models";

export declare namespace IPost {
	export interface Default {
		id: string;
		body: string;
		user_id: string;
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
	}
	export namespace Res {
		export type GetAll = { total: number; data: Default[]; pages: number };
		export type GetOne = Post;
		export type Create = Post;
		export type Update = Post;
		export type Delete = { message: string };
	}
}

export declare interface IPostService {}
export declare interface IPostController {}
export declare interface IPostRoute {}

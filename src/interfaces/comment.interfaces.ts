import { FilterDto, PaginationDto, SearchDto, SortDto } from "../dtos";
import { Comment } from "../models";

export declare namespace IComment {
	export interface Default {
		id: string;
		body: string;
		post_id: string;
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
		export type GetOne = Comment;
		export type Create = Comment;
		export type Update = Comment;
		export type Delete = { message: string };
	}
}

export declare interface ICommentService {}
export declare interface ICommentController {}
export declare interface ICommentRoute {}

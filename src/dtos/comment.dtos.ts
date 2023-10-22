import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { IComment } from "../interfaces";
import { FilterDto } from "./filter.dtos";
import { PaginationDto } from "./pagination.dtos";
import { SearchDto } from "./search.dtos";
import { SortDto } from "./sort.dtos";

export class CommentGetAllDto implements IComment.Req.GetAll {
	filter?: FilterDto;
	pagination?: PaginationDto;
	search?: SearchDto;
	sort?: SortDto;
}

export class CommentGetOneDto implements IComment.Req.GetOne {
	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	id: string;
}

export class CommentCreateDto implements IComment.Req.Create {
	@IsString()
	@IsNotEmpty()
	body: string;

	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	post_id: string;

	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	user_id: string;
}

export class CommentUpdateDto implements IComment.Req.Update {
	@IsString()
	@IsOptional()
	body: string;

	@IsUUID("4")
	@IsString()
	@IsOptional()
	post_id: string;

	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	user_id: string;
}

export class CommentDeleteDto implements IComment.Req.GetOne {
	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	id: string;
}

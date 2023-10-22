import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { IPost } from "../interfaces";
import { FilterDto } from "./filter.dtos";
import { PaginationDto } from "./pagination.dtos";
import { SearchDto } from "./search.dtos";
import { SortDto } from "./sort.dtos";

export class PostGetAllDto implements IPost.Req.GetAll {
	filter?: FilterDto;
	pagination?: PaginationDto;
	search?: SearchDto;
	sort?: SortDto;
}

export class PostGetOneDto implements IPost.Req.GetOne {
	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	id: string;
}

export class PostCreateDto implements IPost.Req.Create {
	@IsString()
	@IsNotEmpty()
	body: string;

	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	user_id: string;
}

export class PostUpdateDto implements IPost.Req.Update {
	@IsString()
	@IsOptional()
	body: string;

	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	user_id: string;
}

export class PostDeleteDto implements IPost.Req.GetOne {
	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	id: string;
}

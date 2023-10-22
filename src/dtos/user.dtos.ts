import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, MinLength } from "class-validator";
import { IUser } from "../interfaces";
import { FilterDto } from "./filter.dtos";
import { PaginationDto } from "./pagination.dtos";
import { SearchDto } from "./search.dtos";
import { SortDto } from "./sort.dtos";

export class UserGetAllDto implements IUser.Req.GetAll {
	filter?: FilterDto;
	pagination?: PaginationDto;
	search?: SearchDto;
	sort?: SortDto;
}

export class UserGetOneDto implements IUser.Req.GetOne {
	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	id: string;
}

export class UserCreateDto implements IUser.Req.Create {
	@IsString()
	@IsNotEmpty()
	info: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@MinLength(8)
	@IsString()
	@IsNotEmpty()
	password: string;

	@IsPhoneNumber("UZ")
	@IsString()
	@IsNotEmpty()
	phone_number: string;
}

export class UserUpdateDto implements IUser.Req.Update {
	@IsString()
	@IsOptional()
	info: string;

	@IsString()
	@IsOptional()
	name: string;

	@MinLength(8)
	@IsString()
	@IsOptional()
	password: string;

	@IsPhoneNumber("UZ")
	@IsString()
	@IsOptional()
	phone_number: string;
}

export class UserDeleteDto implements IUser.Req.GetOne {
	@IsUUID("4")
	@IsString()
	@IsNotEmpty()
	id: string;
}

export class UserLoginDto implements IUser.Req.Login {
	@IsPhoneNumber("UZ")
	@IsString()
	@IsNotEmpty()
	phone_number: string;

	@MinLength(8)
	@IsString()
	@IsNotEmpty()
	password: string;
}

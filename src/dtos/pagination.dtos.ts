import { IsInt, IsOptional, IsPositive } from "class-validator";
import { IPagination } from "../interfaces/pagination.interfaces";

export class PaginationDto implements IPagination {
	@IsPositive()
	@IsInt()
	@IsOptional()
	page?: number;

	@IsPositive()
	@IsInt()
	@IsOptional()
	size?: number;
}

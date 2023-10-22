import { IsOptional } from "class-validator";
import { IFilter } from "../interfaces/filter.interfaces";

export class FilterDto implements IFilter {
	[key: string]: string | boolean | number;
}

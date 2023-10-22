import { ISort, ISortValue } from "../interfaces/sort.interfaces";

export class SortDto implements ISort {
	[key: string]: ISortValue;
}

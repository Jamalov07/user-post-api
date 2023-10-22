export declare interface ISort {
	[key: string]: ISortValue;
}

export declare type ISortValue = "ASC" | "DESC";
export declare type ISortOptions = [string, ISortValue];

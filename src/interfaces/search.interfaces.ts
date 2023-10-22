import { Op } from "sequelize";

export declare interface ISearch {
	[key: string]: string | { [Op.iLike]: string };
}

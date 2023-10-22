import { Op } from "sequelize";
import { ISearch } from "../interfaces/search.interfaces";

export class SearchDto implements ISearch {
	[key: string]: string | { [Op.iLike]: string };
}

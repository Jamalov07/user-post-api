import { Op } from "sequelize";
import { sortValues, userFilterKeys, userPagination, userSearchKeys, userSortKeys } from "../constants";
import { HttpException } from "../exceptions";
import { IFilter, ISearch, ISort, ISortOptions, ITokens, IUser } from "../interfaces";
import { User } from "../models";
import * as bcrypt from "bcrypt";
import { JWTService } from "./jwt.service";

export class UserService {
	#user: typeof User;
	#jwtService: JWTService;
	constructor() {
		this.#user = User;
		this.#jwtService = new JWTService();
	}

	async get_all(query: IUser.Req.GetAll): Promise<IUser.Res.GetAll> {
		const page: number = query.pagination?.page || userPagination.page_number;
		const size: number = query.pagination?.size || userPagination.page_size;
		const skip: number = (page - 1) * size;

		const search: ISearch = query.search || {};
		const filter: IFilter = query.filter || {};
		const sort: ISort = query.sort || {};

		let sortOptions: ISortOptions[] = [];
		let filterOptions: IFilter = {};
		let searchOptions: ISearch = {};

		Object.keys(search).forEach((key: string) => {
			if (userSearchKeys.includes(key)) {
				if (search[key]) searchOptions[key] = { [Op.iLike]: `%${search[key]}%` };
			}
		});

		Object.keys(filter).forEach((key: string) => {
			if (userFilterKeys.includes(key)) {
				if (filter[key]) filterOptions[key] = filter[key];
			}
		});

		Object.keys(sort).forEach((key) => {
			if (userSortKeys.includes(key)) {
				if (sortValues.includes(sort[key])) sortOptions.push([key, sort[key]]);
			}
		});

		const users: User[] = await this.#user
			.findAll({ where: { ...searchOptions, ...filterOptions }, limit: size, offset: skip, order: sortOptions, include: { all: true } })
			.catch((error: Error) => {
				console.log(error);
				throw new HttpException(500, "Failed to retrieve users");
			});
		const total: number = await this.#user.count({ where: { ...searchOptions, ...filterOptions } }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to count users");
		});
		const pages: number = Math.ceil(total / size);
		return { data: users, total: total, pages: pages };
	}

	async get_one(params: IUser.Req.GetOne): Promise<IUser.Res.GetOne> {
		const user: User = await this.#user.findOne({ where: { id: params.id }, include: { all: true } }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to retrieve user");
		});
		if (!user) {
			throw new HttpException(404, "User not found");
		}
		return user;
	}

	async create(payload: IUser.Req.Create): Promise<IUser.Res.Create> {
		await this.#phone_check({ phone: payload.phone_number });

		const newUser: User = await this.#user.create({ ...payload, password: await bcrypt.hash(payload.password, 7) }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to create user");
		});
		return newUser;
	}

	async update(params: IUser.Req.GetOne, payload: IUser.Req.Update): Promise<IUser.Res.Update> {
		const user: User = await this.get_one(params);
		if (payload.phone_number) {
			await this.#phone_check({ phone: payload.phone_number, id: user.id });
		}
		let pass: string = user.password;
		if (payload.password) {
			pass = await bcrypt.hash(payload.password, 7);
		}
		await user.update({ ...payload, password: pass }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to update user");
		});
		return user;
	}

	async delete(params: IUser.Req.Delete): Promise<IUser.Res.Delete> {
		const user: User = await this.get_one(params);
		await user.destroy().catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to delete user");
		});
		return { message: "User deleted" };
	}

	async #phone_check(payload: { phone: string; id?: string }): Promise<void> {
		const user: User = await this.#user.findOne({ where: { phone_number: payload.phone } }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to check user phone_number");
		});
		if (payload.id) {
			if (user && user.id !== payload.id) {
				throw new HttpException(400, "User phone already exists");
			}
		} else {
			if (user) {
				throw new HttpException(400, "User phone already exists");
			}
		}
	}

	async login(payload: IUser.Req.Login): Promise<IUser.Res.Login> {
		const user: User = await this.#user.findOne({ where: { phone_number: payload.phone_number } }).catch((error) => {
			console.log(error);
			throw new HttpException(500, "Failed to get user with phone_number");
		});
		if (!user) {
			throw new HttpException(400, "User not found with this phone_number");
		}
		const isCorrect: boolean = await bcrypt.compare(payload.password, user.dataValues.password);
		if (!isCorrect) {
			throw new HttpException(400, "The user is not registered. Password not found");
		}
		const tokens: ITokens = await this.#jwtService.getTokens({ id: user.id });
		return { tokens, user: { id: user.id, phone_number: user.dataValues.phone_number, name: user.dataValues.name } };
	}
}

import { Op } from "sequelize";
import { sortValues, postFilterKeys, postPagination, postSearchKeys, postSortKeys } from "../constants";
import { HttpException } from "../exceptions";
import { IFilter, ISearch, ISort, ISortOptions, IPost } from "../interfaces";
import { Post } from "../models";

export class PostService {
	#post: typeof Post;
	constructor() {
		this.#post = Post;
	}

	async get_all(query: IPost.Req.GetAll): Promise<IPost.Res.GetAll> {
		const page: number = query.pagination?.page || postPagination.page_number;
		const size: number = query.pagination?.size || postPagination.page_size;
		const skip: number = (page - 1) * size;

		const search: ISearch = query.search || {};
		const filter: IFilter = query.filter || {};
		const sort: ISort = query.sort || {};

		let sortOptions: ISortOptions[] = [];
		let filterOptions: IFilter = {};
		let searchOptions: ISearch = {};

		Object.keys(search).forEach((key: string) => {
			if (postSearchKeys.includes(key)) {
				if (search[key]) searchOptions[key] = { [Op.iLike]: `%${search[key]}%` };
			}
		});

		Object.keys(filter).forEach((key: string) => {
			if (postFilterKeys.includes(key)) {
				if (filter[key]) filterOptions[key] = filter[key];
			}
		});

		Object.keys(sort).forEach((key) => {
			if (postSortKeys.includes(key)) {
				if (sortValues.includes(sort[key])) sortOptions.push([key, sort[key]]);
			}
		});

		const posts: Post[] = await this.#post
			.findAll({ where: { ...searchOptions, ...filterOptions }, limit: size, offset: skip, order: sortOptions, include: { all: true } })
			.catch((error: Error) => {
				console.log(error);
				throw new HttpException(500, "Failed to retrieve posts");
			});
		const total: number = await this.#post.count({ where: { ...searchOptions, ...filterOptions }, include: { all: true } }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to count posts");
		});
		const pages: number = Math.ceil(total / size);
		return { data: posts, total: total, pages: pages };
	}

	async get_one(params: IPost.Req.GetOne): Promise<IPost.Res.GetOne> {
		const post: Post = await this.#post.findOne({ where: { id: params.id }, include: { all: true } }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to retrieve post");
		});
		if (!post) {
			throw new HttpException(404, "Post not found");
		}
		return post;
	}

	async create(payload: IPost.Req.Create): Promise<IPost.Res.Create> {
		const newPost: Post = await this.#post.create({ ...payload }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to create post");
		});
		return newPost;
	}

	async update(params: IPost.Req.GetOne, payload: IPost.Req.Update): Promise<IPost.Res.Update> {
		const post: Post = await this.get_one(params);

		await post.update({ ...payload }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to update post");
		});
		return post;
	}

	async delete(params: IPost.Req.Delete): Promise<IPost.Res.Delete> {
		const post: Post = await this.get_one(params);
		await post.destroy().catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to delete post");
		});
		return { message: "Post deleted" };
	}
}

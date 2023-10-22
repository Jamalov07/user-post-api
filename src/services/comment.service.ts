import { Op } from "sequelize";
import { sortValues, commentFilterKeys, commentPagination, commentSearchKeys, commentSortKeys } from "../constants";
import { HttpException } from "../exceptions";
import { IFilter, ISearch, ISort, ISortOptions, IComment } from "../interfaces";
import { Comment } from "../models";

export class CommentService {
	#comment: typeof Comment;
	constructor() {
		this.#comment = Comment;
	}

	async get_all(query: IComment.Req.GetAll): Promise<IComment.Res.GetAll> {
		const page: number = query.pagination?.page || commentPagination.page_number;
		const size: number = query.pagination?.size || commentPagination.page_size;
		const skip: number = (page - 1) * size;

		const search: ISearch = query.search || {};
		const filter: IFilter = query.filter || {};
		const sort: ISort = query.sort || {};

		let sortOptions: ISortOptions[] = [];
		let filterOptions: IFilter = {};
		let searchOptions: ISearch = {};

		Object.keys(search).forEach((key: string) => {
			if (commentSearchKeys.includes(key)) {
				if (search[key]) searchOptions[key] = { [Op.iLike]: `%${search[key]}%` };
			}
		});

		Object.keys(filter).forEach((key: string) => {
			if (commentFilterKeys.includes(key)) {
				if (filter[key]) filterOptions[key] = filter[key];
			}
		});

		Object.keys(sort).forEach((key) => {
			if (commentSortKeys.includes(key)) {
				if (sortValues.includes(sort[key])) sortOptions.push([key, sort[key]]);
			}
		});

		const comments: Comment[] = await this.#comment
			.findAll({ where: { ...searchOptions, ...filterOptions }, limit: size, offset: skip, order: sortOptions, include: { all: true } })
			.catch((error: Error) => {
				console.log(error);
				throw new HttpException(500, "Failed to retrieve comments");
			});
		const total: number = await this.#comment.count({ where: { ...searchOptions, ...filterOptions } }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to count comments");
		});
		const pages: number = Math.ceil(total / size);
		return { data: comments, total: total, pages: pages };
	}

	async get_one(params: IComment.Req.GetOne): Promise<IComment.Res.GetOne> {
		const comment: Comment = await this.#comment.findOne({ where: { id: params.id }, include: { all: true } }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to retrieve comment");
		});
		if (!comment) {
			throw new HttpException(404, "Comment not found");
		}
		return comment;
	}

	async create(payload: IComment.Req.Create): Promise<IComment.Res.Create> {
		const newComment: Comment = await this.#comment.create({ ...payload }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to create comment");
		});
		return newComment;
	}

	async update(params: IComment.Req.GetOne, payload: IComment.Req.Update): Promise<IComment.Res.Update> {
		const comment: Comment = await this.get_one(params);

		await comment.update({ ...payload }).catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to update comment");
		});
		return comment;
	}

	async delete(params: IComment.Req.Delete): Promise<IComment.Res.Delete> {
		const comment: Comment = await this.get_one(params);
		await comment.destroy().catch((error: Error) => {
			console.log(error);
			throw new HttpException(500, "Failed to delete comment");
		});
		return { message: "Comment deleted" };
	}
}

import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { IComment } from "../interfaces";
import { Post } from "./post.model";
import { User } from "./user.model";

@Table({ tableName: "comments", freezeTableName: true, timestamps: true, createdAt: "created_at", updatedAt: "updated_at" })
export class Comment extends Model<Comment> implements IComment.Default {
	@Column({ type: DataType.UUID, primaryKey: true, allowNull: false, defaultValue: DataType.UUIDV4 })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	body: string;

	@ForeignKey(() => Post)
	@Column({ type: DataType.UUID, allowNull: false })
	post_id: string;
	@BelongsTo(() => Post)
	post: Post;

	@ForeignKey(() => User)
	@Column({ type: DataType.UUID, allowNull: false })
	user_id: string;
	@BelongsTo(() => User)
	user: User;
}

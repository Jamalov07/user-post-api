import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { IPost } from "../interfaces";
import { Comment } from "./comment.model";
import { User } from "./user.model";

@Table({ tableName: "posts", freezeTableName: true, timestamps: true, createdAt: "created_at", updatedAt: "updated_at" })
export class Post extends Model<Post> implements IPost.Default {
	@Column({ type: DataType.UUID, primaryKey: true, allowNull: false, defaultValue: DataType.UUIDV4 })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	body: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.UUID, allowNull: false })
	user_id: string;
	@BelongsTo(() => User)
	user: User;

	@HasMany(() => Comment, { onDelete: "CASCADE" })
	comments: Comment[];
}

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { IUser } from "../interfaces";
import { Post } from "./post.model";
import { Comment } from "./comment.model";
@Table({ tableName: "users", freezeTableName: true, timestamps: true, createdAt: "created_at", updatedAt: "updated_at" })
export class User extends Model<User> implements IUser.Default {
	@Column({ type: DataType.UUID, primaryKey: true, allowNull: false, defaultValue: DataType.UUIDV4 })
	declare id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	info: string;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;

	@Column({ type: DataType.STRING, allowNull: false })
	phone_number: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@HasMany(() => Post, { onDelete: "CASCADE" })
	posts: Post[];

	@HasMany(() => Comment, { onDelete: "CASCADE" })
	comments: Comment[];
}

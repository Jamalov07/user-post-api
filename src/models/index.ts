import { Comment } from "./comment.model";
import { Post } from "./post.model";
import { User } from "./user.model";

export * from "./comment.model";
export * from "./post.model";
export * from "./user.model";

export const models = [User, Post, Comment];

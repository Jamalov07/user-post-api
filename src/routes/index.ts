import { CommentRoute } from "./comment.routes";
import { PostRoute } from "./post.routes";
import { UserRoute } from "./user.routes";

export * from "./comment.routes";
export * from "./post.routes";
export * from "./user.routes";

export const routes = [new UserRoute("user"), new PostRoute("post"), new CommentRoute("comment")];

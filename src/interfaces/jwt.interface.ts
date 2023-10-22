import { User } from "../models/user.model";

export type TokenOptions = Partial<User>;

export interface ITokens {
    access: string;
    refresh: string;
}



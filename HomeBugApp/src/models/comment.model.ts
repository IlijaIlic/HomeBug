import { UnknownBugModel } from "./unknown-bug.model";
import { UserModel } from "./user.model";

export interface CommentModel{
    id:number;
    user: UserModel;
    text: string;
    ubug: UnknownBugModel;
    rating: number;
}
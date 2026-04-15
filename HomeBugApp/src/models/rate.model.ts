import { CommentModel } from "./comment.model";
import { UserModel } from "./user.model";

export interface RateModel{
    userId: number;
    id: number;
    user: UserModel;
    comment: CommentModel;
    rate: string;


}
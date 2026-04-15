import { CommentModel } from "./comment.model";
import { UserModel } from "./user.model";

export interface UnknownBugModel {
    id: number
    picture_url: string;
    description: string;
    color: string;
    size: string;
    wings: boolean;
    legs: number;
    comments: CommentModel[];
    user: UserModel | null;
}
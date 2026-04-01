import { KnownBugModel } from "./known-bug.model";
import { UnknownBugModel } from "./unknown-bug.model";

export interface UserModel{

    id: number;

    name: string;
    surname: string;

    email: string;
    gender: string;
    
    reputation: number;
    
    comments_helping_others: number;
    known_scans: KnownBugModel[];
    other_users_rated: number;
    saved_bugs: KnownBugModel[];
    unknwon_bugs_scanned: number;
    unknwon_scans: UnknownBugModel[];
}
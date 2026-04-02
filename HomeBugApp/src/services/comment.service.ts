import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentModel } from "../models/comment.model";
import { environment } from "../environment/environment";

@Injectable({ providedIn: 'root' })
export class CommentService {
    constructor(private http: HttpClient) { }


    getAll(): Observable<CommentModel[]> {
        return this.http.get<CommentModel[]>(`${environment.apiUrl}/comment`)
    }

    getById(id: number): Observable<CommentModel> {
        return this.http.get<CommentModel>(`${environment.apiUrl}/comment` + id)
    }
}
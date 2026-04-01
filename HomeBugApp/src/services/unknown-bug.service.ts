import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UnknownBugModel } from "../models/unknown-bug.model";
import { environment } from "../environment/environment";

@Injectable({providedIn: 'root'})
export class UnknownBugService {
    constructor (private http: HttpClient) {}

    getAll() : Observable<UnknownBugModel[]>{
        return this.http.get<UnknownBugModel[]>(`${environment.apiUrl}/unknown-bug`);
    }

    getById(id: number): Observable<UnknownBugModel> {
        return this.http.get<UnknownBugModel>(`${environment.apiUrl}/unknown-bug/` + id)
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../models/user.model";
import { environment } from "../environment/environment";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() : Observable<UserModel[]>{
        return this.http.get<UserModel[]>(`${environment.apiUrl}/user`)
    }

    getById(id: number): Observable<UserModel>{
        return this.http.get<UserModel>(`${environment.apiUrl}/user` + id)
    }
}
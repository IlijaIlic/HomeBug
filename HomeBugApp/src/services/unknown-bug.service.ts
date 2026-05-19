import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UnknownBugModel } from "../models/unknown-bug.model";
import { environment } from "../environment/environment";

@Injectable({ providedIn: 'root' })
export class UnknownBugService {
    constructor(private http: HttpClient) { }

    getAll(filters: any = {}): Observable<[UnknownBugModel[], any, any, any, any]> {
        return this.http.get<[UnknownBugModel[], any, any, any, any]>(`${environment.apiUrl}/unknown-bug`, { params: this.buildParams(filters) });
    }

    private buildParams(filters: any): HttpParams {
        let params = new HttpParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => params = params.append(key, v));
            } else if (value !== null && value !== undefined && value !== '') {
                params = params.set(key, String(value));
            }
        });
        return params;
    }

    getById(id: number): Observable<UnknownBugModel> {
        return this.http.get<UnknownBugModel>(`${environment.apiUrl}/unknown-bug/` + id)
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/unknown-bug/` + id)
    }

    post(uBug: any): Observable<UnknownBugModel> {
        return this.http.post<UnknownBugModel>(`${environment.apiUrl}/unknown-bug`, uBug)
    }

    foundCorrect(ubugId: number, userId: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/unknown-bug/correct/` + ubugId + `/` + userId)
    }
}
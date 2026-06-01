import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KnownBugModel } from "../models/known-bug.model";
import { environment } from "../environment/environment";
import { RegionModel } from "../models/region.model";

@Injectable({ providedIn: 'root' })
export class KnownBugService {
    constructor(private http: HttpClient) { }

    getFiltered(filters: any = {}): Observable<[KnownBugModel[], any, any, any, any, any, any, any, any]> {
        return this.http.get<[KnownBugModel[], any, any, any, any, any, any, any, any]>(`${environment.apiUrl}/known-bug`, { params: this.buildParams(filters) })
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

    getAll(): Observable<KnownBugModel[]> {
        return this.http.get<KnownBugModel[]>(`${environment.apiUrl}/known-bug/all`)

    }

    getById(id: number): Observable<KnownBugModel> {
        return this.http.get<KnownBugModel>(`${environment.apiUrl}/known-bug/` + id)
    }

    getAllRegions(): Observable<RegionModel[]> {
        return this.http.get<RegionModel[]>(`${environment.apiUrl}/region`)
    }

    deleteRegion(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/region/` + id)
    }

    deleteKBug(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/known-bug/` + id)
    }

    postRegion(region: Omit<RegionModel, 'id'>): Observable<RegionModel> {
        return this.http.post<RegionModel>(`${environment.apiUrl}/region`, region)
    }

    postKBug(kbug: any): Observable<KnownBugModel> {
        return this.http.post<KnownBugModel>(`${environment.apiUrl}/known-bug`, kbug)
    }
}
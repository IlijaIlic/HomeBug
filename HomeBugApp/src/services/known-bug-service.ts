import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, Observable } from "rxjs";
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

    getSimilar(filters: any = {}, excludeId: number): Observable<KnownBugModel[]> {
        return this.http.get<KnownBugModel[]>(`${environment.apiUrl}/known-bug/similar`, {
            params: {
                excludeId: excludeId,
                ...(filters.color && { colors: filters.color }),
                ...(filters.size && { sizes: filters.size }),
                ...(filters.bodyType && { bodyTypes: filters.bodyType }),
                ...(filters.regions?.length && { regions: filters.regions }),
            }
        });
    }

    getAllRegions(): Observable<RegionModel[]> {
        return this.http.get<RegionModel[]>(`${environment.apiUrl}/region`)
    }

    getNames(searchField: string): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiUrl}/known-bug/names`, { params: { searchField: searchField } })
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

    patchKBug(id: number, kbug: FormData): Observable<KnownBugModel> {
        return this.http.patch<KnownBugModel>(`${environment.apiUrl}/known-bug/` + id, kbug)
    }
}
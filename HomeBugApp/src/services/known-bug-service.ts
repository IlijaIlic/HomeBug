import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KnownBugModel } from "../models/known-bug.model";
import { environment } from "../environment/environment";
import { RegionModel } from "../models/region.model";

@Injectable({ providedIn: 'root' })
export class KnownBugService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<KnownBugModel[]> {
        return this.http.get<KnownBugModel[]>(`${environment.apiUrl}/known-bug`)
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

    postRegion(region: Omit<RegionModel, 'id'>): Observable<RegionModel> {
        return this.http.post<RegionModel>(`${environment.apiUrl}/region`, region)
    }
}
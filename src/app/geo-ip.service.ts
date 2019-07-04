import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from './model/model';
import {map} from 'rxjs/operators';

export interface GeoIp {
    as: string;
    city: string;
    country: string;
    countryCode: string;
    isp: string;
    lat: number;
    lon: number;
    org: string;
    query: string;
    region: string;
    regionName: string;
    status: string;
    timezone: string;
    zip: string;
}

@Injectable({
    providedIn: 'root'
})
export class GeoIpService {

    constructor(private http: HttpClient) { }

    getGeoLoc(ip?: string): Observable<GeoIp> {
        return this.http.get("http://ip-api.com/json/" + ip).pipe(
            map( res => res as GeoIp)
        );
    }
}

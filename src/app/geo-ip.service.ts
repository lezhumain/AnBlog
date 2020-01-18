import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

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

export interface IpLookup {
    ip: string;
    isp: string;
    org: string;
    hostname: string;
    latitude: number;
    longitude: number;
    postal_code: string;
    city: string;
    country_code: string;
    country_name: string;
    continent_code: string;
    continent_name: string;
    region: string;
    district: string;
    timezone_name: string;
    connection_type: string;
    asn_number: number;
    asn_org: string;
    asn: string;
    currency_code: string;
    currency_name: string;
    'success': boolean;
    'premium': boolean;
    'cached': boolean;
}

@Injectable({
    providedIn: 'root'
})
export class GeoIpService {

    constructor(private http: HttpClient) { }

    match(needle, haystack) {
        const str = haystack;
        const patt = needle;
        const result = str.match(patt);
        // document.getElementById("demo").innerHTML = result;
        return result;
    }

    // getIp(): Observable<string> {
    //     return this.http.get("https://whatismyipaddress.com/").pipe(
    //         map( (res: HttpResponse<string>) => {
    //             // match(/IPv4: .*\s*/, document.querySelector("body").innerText)
    //             debugger;
    //             return '';
    //         }
    //     ));
    // }

    getGeoLoc(): Observable<IpLookup> {
        return this.http.get('https://json.geoiplookup.io/api').pipe(
            map(res => res as IpLookup),
            tap(ip => console.log('Got ip info: %o', ip))
        );
    }
}

import { TestBed } from '@angular/core/testing';

import {GeoIp, GeoIpService} from './geo-ip.service';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {first, take} from 'rxjs/operators';

fdescribe('GeoIpService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientModule]
    }));

    fit('should get data', (done) => {
        const service: GeoIpService = TestBed.get(GeoIpService);
        service.getGeoLoc("").pipe(take(1)).subscribe( (res: GeoIp) => {
            expect(res).toBeTruthy();
            const expected = JSON.stringify({
                as: "AS5089 Virgin Media Limited",
                city: "Hampstead",
                country: "United Kingdom",
                countryCode: "GB",
                isp: "Virgin Media Limited",
                lat: 51.5506,
                lon: -0.1873,
                org: "Vmcbbuk",
                query: "82.36.197.47",
                region: "ENG",
                regionName: "England",
                status: "success",
                timezone: "Europe/London",
                zip: "NW3"
            });
            console.log(res);
            expect(JSON.stringify(res)).toBe(expected);
        }, (err: HttpErrorResponse) => {
            expect(err).toBeFalsy("Got an error");
        }, () => done());
    });
});

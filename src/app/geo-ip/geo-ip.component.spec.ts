import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeoIpComponent} from './geo-ip.component';
import {GeoIpService} from '../geo-ip.service';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';

fdescribe('GeoIpComponent', () => {
    let component: GeoIpComponent;
    let fixture: ComponentFixture<GeoIpComponent>;
    // Create a fake TwainService object with a `getQuote()` spy
    const geoIpService = jasmine.createSpyObj('GeoIpService', ['getGeoLoc']);
    let getQuoteSpy;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GeoIpComponent ],
            providers: [{ provide: GeoIpService, useValue: geoIpService }],
            imports: [HttpClientModule]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoIpComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    fit('should display data', () => {
        const data = {
            as: "AS5089 Virgin Media Limited",
            city: "Hampstead",
            country: "United Kingdom",
            countryCode: "GB",
            isp: "Virgin Media Limited",
            lat: 51.5506,
            lon: -0.1873,
            org: "Vmcbbuk",
            query: '82.36.197.47',
            region: 'ENG',
            regionName: 'England',
            status: 'success',
            timezone: 'Europe/London',
            zip: 'NW3'
        };
        const expected = JSON.stringify(data, null, 2);

        // Make the spy return a synchronous Observable with the test data
        // Make the spy return a synchronous Observable with the test databktytg

        getQuoteSpy = geoIpService.getGeoLoc.and.returnValue(of(data));
        fixture.detectChanges();

        const preElement: HTMLPreElement = fixture.nativeElement.querySelector('pre');
        const text = preElement.innerText;

        expect(text).toBe(expected);
    });
});

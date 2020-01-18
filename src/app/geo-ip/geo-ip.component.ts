import {Component, OnInit} from '@angular/core';
import {GeoIpService, IpLookup} from '../geo-ip.service';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-geo-ip',
    templateUrl: './geo-ip.component.html',
    styleUrls: ['./geo-ip.component.css']
})
export class GeoIpComponent implements OnInit {
        htmlData: string;

    constructor(private geoIpService: GeoIpService) { }

    ngOnInit() {
        const obs = this.geoIpService.getGeoLoc();
        obs.pipe(take(1)).subscribe((data: IpLookup) => {
            this.htmlData = JSON.stringify(data, null, 2);
        }, err => {
            this.htmlData = 'error';
        });
    }

}

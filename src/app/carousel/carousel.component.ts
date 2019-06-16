import {Component, Input, OnInit} from '@angular/core';

export interface ICarouselItem {
    img: string;
    alt: string;
    title: string;
    subTitle: string;
    active: boolean;
}

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

    @Input() items: ICarouselItem[];

    constructor() { }

    ngOnInit() {
    }

}

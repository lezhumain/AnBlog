import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface HeaderData {
    title: string;
    soustitre: string;
    writer?: string;
    createdAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    headerData: BehaviorSubject<HeaderData> = new BehaviorSubject(null);

    constructor() { }
}

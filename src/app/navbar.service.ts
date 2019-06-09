import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CategorieService} from './categorie.service';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    currentCateg: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private categorieService: CategorieService) {}
}

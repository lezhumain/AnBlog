import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Categorie} from './model/model';

@Injectable({
    providedIn: 'root'
})
export class CategorieService {

    constructor() { }

    getCategories(): Observable<Categorie[]> {
        const categories: Categorie[] = [
            {id: 1, name: "General", cssColor: "blue"} as Categorie,
            {id: 2, name: "Lorem Ipsum", cssColor: "orange"} as Categorie
        ];
        return of(categories);
    }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Categorie} from './model/model';
import {first, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategorieService {
    private allCategories$: BehaviorSubject<Categorie[]> = new BehaviorSubject<Categorie[]>([]);

    constructor() {
        this.loadCategories();
    }

    loadCategories() {
        const storedCategories = localStorage.getItem('categories');
        if (!storedCategories) {
            return of([]);
        }

        const categories = JSON.parse(storedCategories) as Categorie[];
        this.allCategories$.next(categories || []);
    }

    getCategories(): Observable<Categorie[]> {
        return this.allCategories$;
    }

    saveCategorie(c: string): Observable<Categorie> {
        return this.getCategories().pipe(
            first(),
            map((categs: Categorie[]) => {
                categs.sort((a, b) => a.id - b.id);
                const categ = {
                    id: categs[0] ? categs[0].id + 1 : 1,
                    name: c,
                    cssColor: 'yellow'
                } as Categorie;


                if (categs.some(cc => cc.name === categ.name)) {
                    return null;
                }

                categs = [categ].concat(categs);
                localStorage.setItem('categories', JSON.stringify(categs));

                this.allCategories$.next(categs);

                return categ;
            })
        );
    }
}

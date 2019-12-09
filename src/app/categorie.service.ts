import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Categorie} from './model/model';
import {first, map} from 'rxjs/operators';

export class BaseService {
    protected load<T>(key: string): Observable<T[]> {
        const storedCategories = localStorage.getItem(key);
        if (!storedCategories) {
            return of([]);
        }

        const categories = JSON.parse(storedCategories) as T[];
        return of(categories);
    }
}

@Injectable({
    providedIn: 'root'
})
export class CategorieService extends BaseService {
    private allCategories$: BehaviorSubject<Categorie[]> = new BehaviorSubject<Categorie[]>([]);

    constructor() {
        super();
        this.loadCategories();
    }

    loadCategories() {
        this.load<Categorie>('categories').pipe(
            first()
        ).subscribe((categories: Categorie[]) => {
            this.allCategories$.next(categories || []);
        });
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

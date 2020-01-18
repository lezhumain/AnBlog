import {Component, OnDestroy, OnInit} from '@angular/core';
import {Categorie} from '../model/model';
import {CategorieService} from '../categorie.service';
import {takeWhile} from 'rxjs/operators';
import {NavbarService} from '../navbar.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

    isAdmin = true;
    categories: Categorie[];

    private alive = true;

    constructor(private categorieService: CategorieService,
                private navService: NavbarService,
                private router: Router) {
    }

    ngOnInit() {
        this.categorieService.getCategories().pipe(takeWhile( () => this.alive))
            .subscribe( (cats: Categorie[]) => {
                this.categories = cats;
            });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    filterBy(name: string) {
        this.navService.currentCateg.next(name);
        if(name !== null) {
            return false;
        }
    }

    goToNewArticle() {
        this.router.navigate(['/new']);
    }
}

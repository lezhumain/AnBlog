/* tslint:disable:variable-name */
import {Article, Categorie, Comment} from './model/model';
import {ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ArticleService} from './article.service';
import {take, takeWhile} from 'rxjs/operators';
import {CommentService} from './comment.service';
import {combineLatest} from 'rxjs';
import {CategorieService} from './categorie.service';
import {JsonUtils} from './utils/tsutils';
import {NavbarService} from './navbar.service';
import {HeaderData, HeaderService} from './header.service';
import {ChangeDetection} from '@angular/cli/lib/config/schema';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'CamsBlog';



    private alive = true;


    categories: Categorie[] = [];


    newArticle: Article;
    currentArticleId = -1;
    isAdmin = true;

    private _headerDataBuff: HeaderData = null;
    headerData: HeaderData;

    constructor(private categorieService: CategorieService, private headerService: HeaderService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.newArticle = new Article();

        this.categorieService.getCategories().pipe(take(1)).subscribe( c => this.categories = c );

        this.headerService.headerData.pipe(takeWhile( () => this.alive)).subscribe( (headerData) => {
            this.headerData = headerData;
            this.cdr.detectChanges();
            console.log("headerData: %o", headerData);
        });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    // ngDoCheck() {
    //     debugger;
    //     if(this.headerData !== this._headerDataBuff) {
    //         this.headerData = this._headerDataBuff;
    //     }
    // }

    getCssTypeClassFromId(categId: number): string {
        const target = this.categories.find(c => c.id === categId); // TODO maybe store in object
        return target ? target.cssColor : undefined;
    }

    addArticle(clone: Article) {
        // this.articles.splice(0, 1, clone);
    }

    showArticle(id: number) {
        this.currentArticleId = id;
    }

    categFilterChange(categName: string) {
        // this.articles.map( a => {
        //     if (categName === null || a.categorie.name === categName) {
        //         a.selected = true;
        //     } else {
        //         a.selected = false;
        //     }
        //     return a;
        // });
    }

    goToNewArticle() {

    }
}

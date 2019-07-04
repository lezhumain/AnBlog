import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {Article, Categorie} from './model/model';
import {debounceTime, map} from 'rxjs/operators';
import {CategorieService} from './categorie.service';

import {default as data_json} from './articles.json';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private readonly storageKey = "appArticles";

    private _articles: BehaviorSubject<Article[]> = new BehaviorSubject([]);

    // private articles: BehaviorSubject<Article> = new BehaviorSubject([]);

    constructor(private categorieService: CategorieService) {
        let articles = JSON.parse(window.localStorage.getItem(this.storageKey)) as Article[];
        // let articles = null;
        if(!articles) {
            // articles = [
            //     {id: 0, titre: 'Article1', content: 'content1', createdAt: '2019-06-01T11:44:40.529Z',
            //         categorieId: 1, writer: "Cams"} as Article,
            //     {id: 1, titre: 'Article2', content: 'content2', createdAt: '2019-06-01T11:54:40.529Z',
            //         categorieId: 1, writer: "Dju"} as Article,
            //     {id: 2, titre: 'Article3', content: 'content3', createdAt: '2019-06-02T11:44:40.529Z',
            //         categorieId: 2, writer: "Cams"} as Article
            // ];
            articles = data_json;
        }
        this._articles.next(articles);

        this._articles.pipe(debounceTime(500)).subscribe( (a) => {
            window.localStorage.setItem(this.storageKey, JSON.stringify(a));
        });
    }

    getArticles(): Observable<Article[]> {
        // return this.articles;

        const articlesObs: Observable<Article[]> = this._articles;

        const categsObs: Observable<Categorie[]> = this.categorieService.getCategories();

        return combineLatest(articlesObs, categsObs).pipe(
            map( ([articles, categs]) => {
                const arts = this.addCategories(articles, categs);
                return arts;
            })
        );
    }

    private addCategories(articles: Article[], categories: Categorie[]): Article[] {
        return articles.map( article => {
            article.categorie = categories.find(ca => Number(ca.id) === Number(article.categorieId));
            return article;
        });
    }

    getArticlesBy(key: string, value: any): Observable<Article[]> {
        return this.getArticles().pipe(
            map( articles => articles.filter( a => {
                return a[key] && a[key] === value;
            }) )
        );
    }

    createArticle(article: Article) {
        const lastId = this._articles.getValue().reduce( (res, item) => {
            if(item.id > res) {
                res = item.id;
            }
            return res;
        }, 0);
        if(!article.id) {
            article.id = lastId + 1;
        }
        const all: Article[] = this._articles.getValue();
        all.push(article);

        this._articles.next(all);
    }

    updateArticle(article: Article) {}

    deleteArticle(articleId: number) {}
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article, Comment} from '../model/model';
import {combineLatest} from 'rxjs';
import {take, takeWhile} from 'rxjs/operators';
import {ArticleService} from '../article.service';
import {CommentService} from '../comment.service';
import {CategorieService} from '../categorie.service';
import {NavbarService} from '../navbar.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

    isAdmin = true;

    private alive = true;

    private _articles: Article[] = [];
    get articles(): Article[] {
        return this._articles;
    }
    set articles(data: Article[]) {
        data.sort( (a: Article, b: Article) => {
            return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime();
        });
        this._articles = data;
    }

    constructor(private articleService: ArticleService,
                private commentService: CommentService,
                private categorieService: CategorieService,
                private navService: NavbarService,
                private router: Router) { }

    ngOnInit() {
        combineLatest(
            this.commentService.getComments(),
            this.articleService.getArticles()
        ).pipe(takeWhile(() => this.alive)).subscribe( ([comments, articles]: [Comment[], Article[]]) => {
            this.articles = articles.map( article => {
                article.comments = comments.filter(c => c.articleId === article.id);
                article.selected = true;
                return article;
            });
        });

        this.navService.currentCateg.pipe(takeWhile( () => this.alive ))
            .subscribe( (categFilter) => {
                this.articles = this.articles.map( article => {
                    article.selected = categFilter === null || categFilter === article.categorie.name;
                    return article;
                });
            });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    goToNewArticle() {
        this.router.navigate(['/new']);
    }
}

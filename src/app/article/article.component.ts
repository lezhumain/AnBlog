import {Component, Input, OnInit} from '@angular/core';
import {Article, Comment} from '../model/model';
import {JsonUtils} from '../utils/tsutils';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../article.service';
import {catchError, debounceTime, distinctUntilChanged, filter, first, map, startWith, subscribeOn, takeWhile} from 'rxjs/operators';
import {HeaderData, HeaderService} from '../header.service';
import {CategorieService} from '../categorie.service';
import {CommentService} from '../comment.service';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    // @Input() article: Article = null;
    article$: Observable<Article> = null;
    headerData: HeaderData = null;
    alive = true;

    articleContent$: Observable<string>;
    private articleId: number;

    constructor(private route: ActivatedRoute,
                private articleService: ArticleService,
                private headerService: HeaderService,
                private commentService: CommentService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.params.id;

        this.article$ = this.articleService.getArticles().pipe(
            takeWhile( () => this.alive),
            debounceTime(500),
            startWith([]),
            catchError( err => {
                console.log("[ArticleComponent::ngOnInit] Got error: %o", err);
                return of(null);
            }),
            map( a => {
                const article = a.find(aa => Number(aa.id) === Number(id));
                if(!article) {
                    return null;
                }
                const headerData = {
                    createdAt: article.createdAt,
                    soustitre: article.soustitre,
                    title: article.titre,
                    writer: article.writer,
                    img: article.img
                };
                // debugger;
                this.headerService.headerData.next(headerData);
                this.articleId = article.id;

                return article;
            })
        );

        this.articleContent$ = this.article$.pipe(
            takeWhile( () => this.alive),
            filter(a => !!a),
            map( article => article.content ),
            distinctUntilChanged()
        );
    }

    ngOnDestroy() {
        this.alive = false;
    }

    addComment(newComment: Comment) {
        // TODO return obs and handle error
        this.articleService.addComment(newComment, this.articleId);
    }
}

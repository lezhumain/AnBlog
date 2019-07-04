import {Component, Input, OnInit} from '@angular/core';
import {Article, Comment} from '../model/model';
import {JsonUtils} from '../utils/tsutils';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../article.service';
import {first, map, subscribeOn} from 'rxjs/operators';
import {HeaderData, HeaderService} from '../header.service';
import {CategorieService} from '../categorie.service';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    // @Input() article: Article = null;
    article: Article = null;
    headerData: HeaderData = null;

    constructor(private route: ActivatedRoute,
                private articleService: ArticleService,
                private headerService: HeaderService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.params["id"];
        this.articleService.getArticles().pipe(
            first(),
            map( a => a.find(aa => Number(aa.id) === Number(id)))
        ).subscribe( (article: Article) => {
            // debugger;
            this.article = article;
            if(this.article) {
                const headerData = {
                    createdAt: article.createdAt,
                    soustitre: article.soustitre,
                    title: article.titre,
                    writer: article.writer,
                    img: article.img
                };
                // debugger;
                this.headerService.headerData.next(headerData);
            }
        });
    }

    addComment(newComment: Comment) {
        if (this.article.comments) {
            this.article.comments.push(newComment);
        } else {
            this.article.comments = [newComment];
        }
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {Article, Comment} from '../model/model';
import {JsonUtils} from '../utils/tsutils';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    @Input() article: Article = null;

    constructor() {
    }

    ngOnInit() {
    }

    addComment(newComment: Comment) {
        if (this.article.comments) {
            this.article.comments.push(newComment);
        } else {
            this.article.comments = [newComment];
        }
    }
}

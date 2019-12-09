import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../model/model';

@Component({
    selector: 'app-article-preview-card',
    templateUrl: './article-preview-card.component.html',
    styleUrls: ['./article-preview-card.component.css']
})
export class ArticlePreviewCardComponent implements OnInit {

    @Input() article: Article = null;
    private readonly maxLength = 70;
    private readonly maxLengthTitle = 50;

    constructor() {
    }

    get content(): string {
        return this.strip(this.article.content, this.maxLength);
    }

    get titre(): string {
        return this.strip(this.article.titre, this.maxLengthTitle);
    }

    ngOnInit() {
    }

    private strip(value: string, count: number): string {
        if (!value) {
            return value;
        }

        return value.length >= count
            ? value.substr(0, count) + '...'
            : value;
    }
}

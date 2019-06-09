import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../model/model';

@Component({
    selector: 'app-article-preview',
    templateUrl: './article-preview.component.html',
    styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {

    @Input() article: Article = null;

    constructor() { }

    ngOnInit() {
    }

}

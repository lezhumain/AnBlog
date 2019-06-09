import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Article, Categorie, Comment} from '../model/model';
import {JsonUtils} from '../utils/tsutils';
import {NgForm} from '@angular/forms';
import {ArticleService} from '../article.service';
import {take, takeWhile} from 'rxjs/operators';
import {CategorieService} from '../categorie.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-article-edit',
    templateUrl: './article-edit.component.html',
    styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

    // @ts-ignore
    @ViewChild('articleForm') articleForm: NgForm;
    @Output() newArticleEvent = new EventEmitter<Article>();

    newArticle: Article;
    // categories: Categorie[] = [];
    private alive = true;
    private categ: Observable<Categorie[]>;

    constructor(private articleService: ArticleService,
                private categorieService: CategorieService,
                private router: Router) { }

    ngOnInit() {
        this.newArticle = new  Article();

        this.categ =  this.categorieService.getCategories().pipe(takeWhile(() => this.alive));
    }

    ngOnDestroy() {
        this.alive = false;
    }

    addArticle() {
        if (this.articleForm.form.valid === false) {
            return;
        }

        debugger;
        const clone: Article = JsonUtils.cloneObj(this.newArticle) as Article;
        clone.createdAt = JsonUtils.formatDate(new Date());

        console.log('Adding article: %o', clone);

        this.newArticle = new Article();

        this.articleService.createArticle(clone); // TODO observable stuff
        // this.newArticleEvent.emit(clone);

        this.router.navigate(['/']);
    }

    cancelArticle() {
        this.newArticle = new Article();
    }

    setNewCategorie(categorieId: number) {
        this.newArticle.categorieId = categorieId;
    }
}

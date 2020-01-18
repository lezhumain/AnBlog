import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {ArticleComponent} from './article/article.component';
import {CommentComponent} from './comment/comment.component';
import {CommentEditComponent} from './comment-edit/comment-edit.component';
import {ArticleEditComponent} from './article-edit/article-edit.component';
import {TextEditorComponent} from './text-editor/text-editor.component';
import {HomeComponent} from './home/home.component';
import {ArticlePreviewComponent} from './article-preview/article-preview.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {ArticleListComponent} from './article-list/article-list.component';
import {CarouselComponent} from './carousel/carousel.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {TextEditor2Component} from './text-editor2/text-editor2.component';
import {CKEditorModule} from 'ckeditor4-angular';
import {EscapeHtmlPipe} from './keep-html.pipe';
import {HttpClientModule} from '@angular/common/http';
import {GeoIpComponent} from './geo-ip/geo-ip.component';
import {ArticlePreviewCardComponent} from './article-preview-card/article-preview-card.component';

// const appRoutes: Routes = [
//     { path: 'crisis-center', component: CrisisListComponent },
//     { path: 'hero/:id',      component: HeroDetailComponent },
//     {
//         path: 'heroes',
//         component: HeroListComponent,
//         data: { title: 'Heroes List' }
//     },
//     { path: '',
//         redirectTo: '/heroes',
//         pathMatch: 'full'
//     },
//     { path: '**', component: PageNotFoundComponent }
// ];

const appRoutes: Routes = [
    { path: '', component: ArticleListComponent },
    { path: 'new', component: ArticleEditComponent },
    { path: 'post/:id', component: ArticleComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    CommentComponent,
    CommentEditComponent,
    ArticleEditComponent,
    TextEditorComponent,
    HomeComponent,
    ArticlePreviewComponent,
    NavbarComponent,
    ArticleListComponent,
    CarouselComponent,
    TextEditor2Component,
      EscapeHtmlPipe,
      GeoIpComponent,
      ArticlePreviewCardComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
      CKEditorModule,
      HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, NgForm} from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { CommentComponent } from './comment/comment.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { HomeComponent } from './home/home.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';

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
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

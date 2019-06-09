import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Comment} from './model/model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    // private comments: BehaviorSubject<Comment> = new BehaviorSubject([]);

    constructor() { }

    getComments(): Observable<Comment[]> {
        // return this.comments;

        const comments: Comment[] = [
            {id: 0, content: 'content1', createdAt: '2019-06-01T11:44:40.529Z', writer: "Lez", articleId: 1} as Comment,
            {id: 1, content: 'content2', createdAt: '2019-06-01T11:54:40.529Z', writer: "Gtlhtf", articleId: 1} as Comment,
            {id: 2, content: 'content3', createdAt: '2019-06-02T11:44:40.529Z', writer: "vguf", articleId: 2} as Comment
        ];
        return of(comments);
    }

    getCommentsBy(key: string, value: any): Observable<Comment[]> {
        return this.getComments().pipe(
            map( comments => comments.filter( a => {
                return a[key] && a[key] === value;
            }) )
        );
    }

    createComment(comment: Comment) {}

    updateComment(comment: Comment) {}

    deleteComment(commentId: number) {}

}

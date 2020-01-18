import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Comment} from './model/model';
import {first, map} from 'rxjs/operators';
import {BaseService} from './categorie.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {
    private allComments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

    constructor() {
        super();
        this.loadComments();
    }

    loadComments() {
        this.load<Comment>('comments').pipe(
            first()
        ).subscribe((comments: Comment[]) => {
            this.allComments$.next(comments || []);
        });
    }

    getComments(): Observable<Comment[]> {
        return this.allComments$;
    }

    getCommentsBy(key: string, value: any): Observable<Comment[]> {
        return this.getComments().pipe(
            map( comments => comments.filter( a => {
                return a[key] && a[key] === value;
            }) )
        );
    }

    saveComment(c: Comment): Observable<Comment> {
        return this.getComments().pipe(
            first(),
            map((categs: Comment[]) => {
                categs.sort((a, b) => a.id - b.id);

                if (categs.some(cc => cc.createdAt === c.createdAt)) {
                    return null;
                }

                categs = [c].concat(categs);
                localStorage.setItem('comments', JSON.stringify(categs));

                this.allComments$.next(categs);

                return c;
            })
        );
    }

    updateComment(comment: Comment) {}

    deleteComment(commentId: number) {}

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Comment} from '../model/model';
import {JsonUtils} from '../utils/tsutils';

@Component({
    selector: 'app-comment-edit',
    templateUrl: './comment-edit.component.html',
    styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

    @Output() newCommentEvent = new EventEmitter<Comment>();

    newComment: Comment;

    constructor() { }

    ngOnInit() {
        this.newComment = new Comment();
    }

    addComment() {
        const clone: Comment = JsonUtils.cloneObj(this.newComment) as Comment;
        clone.createdAt = JsonUtils.formatDate(new Date());

        this.newComment = new Comment();

        this.newCommentEvent.emit(clone);
    }

    cancelComment() {
        this.newComment = new Comment();
    }
}

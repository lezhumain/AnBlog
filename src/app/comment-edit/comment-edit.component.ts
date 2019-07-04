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

    content = "";

    constructor() { }

    ngOnInit() {
    }

    addComment() {
        const clone: Comment = new Comment();
        clone.content = this.content;
        clone.createdAt = JsonUtils.formatDate(new Date());

        this.newCommentEvent.emit(clone);
    }

    cancelComment() {
        this.content = "";
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CommentCreate, ViewPostResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'create-comment-component',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
  @Input()
  postID;

  constructor(public app: AppService) {}

  ngOnInit() {}

  onSubmitComment(form) {
    const comment: CommentCreate = form.value;
    comment.post = this.postID;
    comment.author = this.app.wp.getID;
    this.app.wp.createComment(comment).subscribe(data => {
      this.app.comments.push(<ViewPostResponse>data);
      form.reset();
    });
  }
}
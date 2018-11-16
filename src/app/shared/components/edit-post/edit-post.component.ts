import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ViewPostResponse, MediaResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'edit-post-component',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  @Input()
  editPost: ViewPostResponse;
  disable = false;

  constructor(public app: AppService) {}

  ngOnInit() {
    this.loadMedia();
  }

  loadMedia() {
    const param = '?author=' + this.app.wp.getID + '&_embed';
    this.app.wp.showMedia(param).subscribe(
      (data) => {
        this.app.profileMedia = <MediaResponse[]>data.body;
      },
      (e) => this.app.errorLog(e, 'Profile Media'),
    );
  }

  onUpdatePost(form) {
    const value = form.value;
    this.disable = true;
    this.app.wp.updatePost(this.editPost.id, value, '?_embed').subscribe(
      (data) => {
        this.editPost = Object.assign(this.editPost, data);
        alert('You have successfully edited post: ' + this.editPost.title.rendered);
        this.disable = false;
      },
      (e) => {
        this.app.errorLog(e, 'Update Post');
        this.disable = false;
      },
    );
  }
}

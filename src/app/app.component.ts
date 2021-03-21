import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from './services/blog.service';
import {Router} from '@angular/router';
import {PostDetails} from './interfaces/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  closeResult: string;
  CreatePostForm: FormGroup;
  posts: PostDetails[];

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private blogService: BlogService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.CreatePostForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
      date_created: [null]
    });
    this.blogService.getAllPosts().subscribe(res => {
      this.posts = res;
    }, error => {
      console.log(error);
    });
  }

  open(content): any {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      result['date_created'] = new Date();
      this.blogService.createPost(result).subscribe(res => {
        this.router.navigate(['/']);
        location.reload();
      });
    }, (reason) => {
    });
  }

}

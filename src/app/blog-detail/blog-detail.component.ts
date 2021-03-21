import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostDetails} from '../interfaces/interface';
import {BlogService} from '../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  UpdatePostForm: FormGroup;
  postDetail: PostDetails;
  postId = '';
  posts: PostDetails[];
  categories = ['MEAT', 'VEGETABLES', 'FRUITS', 'GRAINS'];


  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPostDetails(this.postId);
    this.UpdatePostForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
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
      this.blogService.updatePost(result, this.postId).subscribe(res => {
        this.getPostDetails(this.postId);
      });
    }, (reason) => {

    });
  }

  deletePost(content): any {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.blogService.deletePost(this.postId).subscribe(res => {
        this.router.navigate(['/']);
      });
    }, (reason) => {

    });
  }

  getPostDetails(postId): any {
    this.blogService.getPostDetails(postId).subscribe(res => {
      this.postDetail = res;
      this.UpdatePostForm.patchValue({
        title: this.postDetail.title,
        description: this.postDetail.description,
        author: this.postDetail.author,
        image: this.postDetail.image,
        category: this.postDetail.category,
      });
    }, error => {
      console.log(error);
    });
  }
}


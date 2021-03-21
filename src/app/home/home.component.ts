import {Component, OnInit} from '@angular/core';
import {PostDetails} from '../interfaces/interface';
import {BlogService} from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: PostDetails[];

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.blogService.getAllPosts().subscribe(res => {
      this.posts = res;
    }, error => {
      console.log(error);
    });
  }

}

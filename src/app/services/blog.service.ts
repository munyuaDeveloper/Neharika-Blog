import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostDetails} from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = 'http://localhost:3000/';
  postsUrl = this.baseUrl + 'posts';
  createPostUrl = this.baseUrl + 'posts';
  updatePostUrl = this.baseUrl + 'posts/';
  postDetailUrl = this.baseUrl + 'posts/';

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<PostDetails[]> {
    return this.http.get<PostDetails[]>(this.postsUrl);
  }

  getPostDetails(postId): Observable<PostDetails> {
    return this.http.get<PostDetails>(this.postDetailUrl + postId);
  }

  createPost(postData): any {
    return this.http.post(this.createPostUrl, postData);
  }

  updatePost(postData, postId): any {
    return this.http.put(this.updatePostUrl + postId, postData);
  }

  deletePost(postId): any {
    return this.http.delete(this.postDetailUrl + postId);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ISearch } from '../models/search.interface';
@Injectable({
  providedIn: 'root'
})
export class BooksListService {
  public favBooks:Set<any> = new Set<any>();
  public favBooksSub:BehaviorSubject<Set<any>> = new BehaviorSubject(this.favBooks);

  private url: string = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) { }
  
  getData(searchObj: ISearch) { 
    let params: HttpParams = new HttpParams().set('q',`intitle:${searchObj.searchTerm}`)
                                             .set('maxResults',`${searchObj.pageSize}`)
                                             .set('startIndex', `${searchObj.pageSize * searchObj.startIndex}`)
    return this.http.get(this.url, {params:params} );
  }

  removeFavorite(item:any){
    this.favBooks.delete(item);
    this.favBooksSub.next(this.favBooks);
  }

}

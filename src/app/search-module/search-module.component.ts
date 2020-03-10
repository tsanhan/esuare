import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BooksListService } from '../services/books-list.service';
import { tap, map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { ISearch } from '../models/search.interface';

@Component({
  selector: 'app-search-module',
  templateUrl: './search-module.component.html',
  styleUrls: ['./search-module.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchModuleComponent implements OnInit {

  public faSearch = faSearch;
  public data:Observable<any>;
  public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public selected: null;

  @ViewChild('searchInput') searchInput :ElementRef;
  constructor(private booksList: BooksListService, public dialog: MatDialog) { }
  
  public pageSize:number = 20; 
  public pageIndex:number = 0; 
  
  ngOnInit(): void {}

  private updateData() {
    let search:ISearch = {
      pageSize: this.pageSize,
      searchTerm: this.searchInput.nativeElement.value,
      startIndex: this.pageIndex
    }
    this.data = this.booksList.getData(search).pipe(
      tap<any>(x => this.spinner.next(false))
    );
  }

  onSearch() {
    this.spinner.next(true);
    this.updateData();
  }
    onSelectBook(item:any) {
    this.selected = item;
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: 'min-content',
      minWidth:'24%',
      data: this.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.booksList.favBooks.add(result);
      }
      
    });
  }

  onPageChage($event:any) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.updateData();
  }
}

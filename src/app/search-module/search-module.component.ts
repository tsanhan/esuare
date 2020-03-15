import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Observer, fromEvent, from, of, combineLatest, Subscription } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BooksListService } from '../services/books-list.service';
import { tap, debounceTime, switchMap, distinctUntilChanged, mergeAll, map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { ISearch } from '../models/search.interface';

@Component({
  selector: 'app-search-module',
  templateUrl: './search-module.component.html',
  styleUrls: ['./search-module.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchModuleComponent implements OnInit, AfterViewInit , OnDestroy{

  public faSearch = faSearch;
  public data:any;
  public spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public selected: null;
  private combineSub: Subscription;
  @ViewChild('searchInput') searchInput :ElementRef;
  paganatorData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private booksList: BooksListService, public dialog: MatDialog) { }
  
  public pageSize:number = 20; 
  public pageIndex:number = 0; 
  private numInCombine: number = 0;
  

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
   this.combineSub = combineLatest(
    fromEvent(<HTMLInputElement>this.searchInput.nativeElement, "keyup").pipe(
      tap<any>(x => this.numInCombine = 0), 
      tap<any>(x => this.spinner.next(true)),
       debounceTime(1000),
       switchMap(x => {
         
          return this.booksList.getData({
            pageSize: this.pageSize,
            searchTerm: this.searchInput.nativeElement.value,
            startIndex: this.pageIndex
           });
        }),
       tap<any>(x => this.spinner.next(false)),
      ),
      this.paganatorData.pipe(
        tap<any>(x => this.numInCombine = 1), 
        tap<any>(x => this.spinner.next(true)),
        switchMap(x => {
          this.pageSize = x?.pageSize || this.pageSize;
          this.pageIndex = x?.pageIndex || this.pageIndex;

          return this.booksList.getData({
            pageSize: this.pageSize,
            searchTerm: this.searchInput.nativeElement.value,
            startIndex: this.pageIndex
           })
        }),
        tap<any>(x => this.spinner.next(false)),
      )
    ).subscribe(x => {
      this.data = x[this.numInCombine];
    })
  }
  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.combineSub.unsubscribe();
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
}

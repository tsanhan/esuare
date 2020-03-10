import { Component, OnInit } from '@angular/core';
import { BooksListService } from '../services/books-list.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(public booksList: BooksListService) { }

  ngOnInit(): void {
  }

 
}

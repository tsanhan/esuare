import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchModuleRoutingModule } from './search-module-routing.module';
import { SearchModuleComponent } from './search-module.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [SearchModuleComponent, BookDialogComponent],
  imports: [
    CommonModule,
    SearchModuleRoutingModule,
    FontAwesomeModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class SearchModuleModule { }

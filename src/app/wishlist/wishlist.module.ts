import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    MatListModule,
    MatButtonModule
  ]
})
export class WishlistModule { }

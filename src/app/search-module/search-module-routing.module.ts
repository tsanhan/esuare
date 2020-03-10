import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchModuleComponent } from './search-module.component';

const routes: Routes = [
  { 
    path: '', 
    component: SearchModuleComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchModuleRoutingModule { }

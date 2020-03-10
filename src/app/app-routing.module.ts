import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { IdentityGuard } from './guards/identity.guard';


const routes: Routes = [
  {
    path:'',
    component: WelcomePageComponent,
    pathMatch:'full'
  },
  { 
    path: 'search-module', 
    loadChildren: () => import('./search-module/search-module.module').then(m => m.SearchModuleModule),
    canActivate:[IdentityGuard] 
  },
  { 
    path: 'wishlist', 
    loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule),
    canActivate:[IdentityGuard]
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

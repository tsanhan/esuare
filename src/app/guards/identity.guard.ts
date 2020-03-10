import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IdentityService } from '../services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {
  constructor(private identity: IdentityService, private router: Router) {  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
                return this.identity.UserName.pipe(
                  map(x => !!x),
                  tap(x => {
                    if(!x){
                      console.log('not name');
                      this.router.navigate(['/']);
                    }
                  })
                );
  }
  
}

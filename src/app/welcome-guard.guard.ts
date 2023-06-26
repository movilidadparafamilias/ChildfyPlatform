import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionService } from './services/connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuardGuard implements CanActivate, CanLoad {
  constructor(private authService: ConnectionService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isParent().then((res) => {
      if (res) {
        this.router.navigateByUrl('/tabs');
        return false;
      }
      return true;
    });


  }





  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isParent().then((res) => {
      if (res) {
        this.router.navigateByUrl('/tabs');
        return false;
      }
      return true;
    });

  }
}

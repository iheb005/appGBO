import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {JwtService} from "../service/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class RoleRSGuard implements CanActivate {

  constructor(private router: Router,
              private jwtService: JwtService) {
  }


  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    if (this.jwtService.getAuthenticatedUserRole() === 'ROLE_RS') {
      return true;
    }
    return this.router.createUrlTree(['unauthorized']);
  }

}

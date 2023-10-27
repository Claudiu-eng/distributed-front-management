import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {TokenService} from "../../service/TokenService/token.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router,private tokenService:TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const decoded = this.tokenService.decode();
    if(decoded == null){
      this.router.navigate(['/login']);
      return false;
    }
    else {
      for (let i=0;i<decoded.role.length;i++){
        if(decoded.role[i] === "USER")
          return true;
      }
      this.router.navigate(['/login']);
      return false;

    }

  }


}

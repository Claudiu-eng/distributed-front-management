import {Component, Input} from '@angular/core';
import {UserService} from "../../service/UserService/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input() username !:string ;

  constructor(private userService:UserService,private router: Router) {
  }

  logout():void{
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}

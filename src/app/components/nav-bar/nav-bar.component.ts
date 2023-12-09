import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from "../../service/UserService/user.service";
import {Router} from "@angular/router";
import {UserDTO} from "../../dto/UserDTO";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input() username !:string ;
  @Output() openChatEvent = new EventEmitter<void>();

  constructor(private userService:UserService,private router: Router) {
  }

  openChat():void{
    this.openChatEvent.emit();
  }

  logout():void{
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}

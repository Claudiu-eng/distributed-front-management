import {Component, OnInit} from '@angular/core';
import {LogInService} from "../../service/LogInService/log-in.service";
import {AuthenticationRequestDTO} from "../../dto/AuthenticationRequestDTO";
import {AuthenticationResponseDTO} from "../../dto/AuthenticationResponseDTO";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenService} from "../../service/TokenService/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user!: AuthenticationRequestDTO
  logInText:string = "Log In";
  errorMessage!:string;
  status!:number;
  myVar!:boolean;
  constructor(private logInService: LogInService,private tokenService:TokenService,private router: Router) {
  }

  logIn():void {
    this.myVar  = false;
    this.logInService.logIn(this.user).subscribe(
      rez => {
            this.status = 0;
            sessionStorage.setItem('access_token',rez.token);
            const decoded = this.tokenService.decode();
            if( decoded == null)
              this.router.navigate(['/error']);
            else {
              for (let i=0;i<decoded.role.length;i++){
                if(decoded.role[i] === "ADMIN") {
                  this.myVar = true;
                  this.router.navigate(['/admin']);
                }
              }
            }
            if(!this.myVar)
              this.router.navigate(['/user']);
      },(error)=>{
        this.status = -1;
        this.errorMessage = error.error.message;
      }
    )
  }

  ngOnInit(): void {
    this.user = new AuthenticationRequestDTO();
    this.user.password = ''
    this.user.email = ''
    sessionStorage.clear();
  }

  receiveValueFromModal($event: { message: string; status: number }) {
    this.status = 0;
  }


}

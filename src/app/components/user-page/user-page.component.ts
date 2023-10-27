import {Component, OnInit} from '@angular/core';
import {DeviceDTO} from "../../dto/DeviceDTO";
import {TokenService} from "../../service/TokenService/token.service";
import {Router} from "@angular/router";
import {DeviceService} from "../../service/DeviceService/device.service";
import {HeadersTableDTO} from "../../dto/HeadersTableDTO";
import {UserDTO} from "../../dto/UserDTO";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{


  devicesDTO!:DeviceDTO[]
  username !:string;
  headers:HeadersTableDTO = {
    first:"Id",
    second:"Address",
    third:"Maxim Hourly Energy",
    fourth:"Description",
    fifth:"User"
  }
  usersDTO:UserDTO[] = [];
  constructor(private tokenService:TokenService,private router: Router,
              private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    const tokenDecoded = this.tokenService.decode();
    if (tokenDecoded){
      this.username = tokenDecoded.sub;
      this.deviceService.getDevicesById(tokenDecoded.id).subscribe(data => {
        this.devicesDTO = data;
      })
  }
  }

}

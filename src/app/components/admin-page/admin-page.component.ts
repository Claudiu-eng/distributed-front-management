import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../service/TokenService/token.service";
import {Router} from "@angular/router";
import {HeadersTableDTO} from "../../dto/HeadersTableDTO";
import {UserDTO} from "../../dto/UserDTO";
import {UserService} from "../../service/UserService/user.service";
import {catchError, throwError} from "rxjs";
import {DeviceDTO} from "../../dto/DeviceDTO";
import {DeviceService} from "../../service/DeviceService/device.service";
import {RegisterDTO} from "../../dto/RegisterDTO";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{

  username !:string;
  errorMessage!:string;
  headersUsers:HeadersTableDTO = {
    first:"Id",
    second:"Username",
    third:"First Name",
    fourth:"Last Name",
    fifth:"Roles"
  }
  headersDevices:HeadersTableDTO = {
    first:"Id",
    second:"Address",
    third:"Maxim Hourly Energy",
    fourth:"Description",
    fifth:"User"
  }
  headers = {
    first:"",
    second:"",
    third:"",
    fourth:"",
    fifth:""
  }
  usersDTO!:UserDTO[]
  devicesDTO!:DeviceDTO[]
  usersButtonText = "Users"
  devicesButtonText = "Devices"
  addUserButtonText = "Add User"
  addDeviceButtonText = "Add Device"
  entity !:number;
  buttonNumber :number = 0;
  userDTO!: RegisterDTO;
  buttonText!: string;
  isEdit!:boolean;
  items!:string[];
  itemsForDevices!:UserDTO[];
  deviceDTO!: DeviceDTO;

  constructor(private tokenService:TokenService,private router: Router,private userService:UserService,
              private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    const tokenDecoded = this.tokenService.decode();
    if(tokenDecoded)
      this.username = tokenDecoded.sub;
    this.entity = 0;
    this.userDTO = new RegisterDTO();
    this.deviceDTO = new DeviceDTO();
    this.buttonText = "Save";
  }

  editValue(id:string):void{
    if(this.buttonNumber ==1 ){
      if(id === this.tokenService.decode()?.id){
        this.buttonNumber = -1;
        this.errorMessage = "cannot edit yourself";
        return;
      }
      const list =this.usersDTO.filter((userDTO)=>
        userDTO.id === id
      );

      if(list[0].role[0]==="ADMIN"){
        this.items = ["ADMIN","USER"];
      }else this.items = ["USER","ADMIN"];

      this.isEdit = true;
      this.userDTO.email = list[0].email;
      this.userDTO.role = list[0].role;
      this.userDTO.lastName = list[0].lastName;
      this.userDTO.firstName = list[0].firstName;
      this.userDTO.password = "";
      this.buttonNumber = 2;
    }else if(this.buttonNumber == 4){
      this.userService.getUsers().subscribe(
        (success) =>{
          const list =this.devicesDTO.filter((deviceDTO)=>
            deviceDTO.id === id
          );
          this.isEdit = true;
          this.deviceDTO.userId = list[0].userId;
          this.deviceDTO.address = list[0].address;
          this.deviceDTO.description = list[0].description;
          this.deviceDTO.maximHourlyEnergy = list[0].maximHourlyEnergy;
          this.itemsForDevices = success;
          this.deviceDTO.id = list[0].id;
          this.buttonNumber = 3;
        },
        (error)=>{
          this.buttonNumber = -1;
          this.errorMessage = error.error.message;
        }
      );

    }
  }
  deleteValue(id:string):void{
    if(this.buttonNumber ==1 ){
      if(id === this.tokenService.decode()?.id){
        this.buttonNumber = -1;
        this.errorMessage = "cannot delete yourself";
        return;
      }
      this.userService.deleteUser(id).subscribe(
        (success)=>{
          this.seeUsers();
        },
        (error)=>{
          this.buttonNumber = -1;
          this.errorMessage = error.error.message;
        }
      );
    }else if(this.buttonNumber == 4){
      this.deviceService.deleteDevice(id).subscribe(
        (success)=>{
          this.seeDevices();
        },
        (error)=>{
          this.buttonNumber = -1;
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  receiveValueFromModal(value:any) {
    if(value.status === 0) {
      this.buttonNumber = 0;
    }else if(value.status === -1){
      this.buttonNumber = -1;
      this.errorMessage = value.message;
    }
  }
  addUser():void{
    this.items = ["USER","ADMIN"];
    this.userDTO.email = "";
    this.userDTO.lastName = "";
    this.userDTO.firstName = "";
    this.userDTO.password = "";
    this.isEdit = false;
    this.buttonNumber = 2;
  }
  addDevice():void{
    this.userService.getUsers().subscribe(
      (success) =>{
        this.deviceDTO.description = "";
        this.deviceDTO.address = "";
        this.deviceDTO.maximHourlyEnergy = "";
        this.isEdit = false;
        this.deviceDTO.id = "";
        this.itemsForDevices = success;
        this.buttonNumber = 3;
      },
      (error)=>{

        this.buttonNumber = -1;
        this.errorMessage = error.error.message;

      }

    )
  }

  seeDevices():void{
    this.buttonNumber = 4;
    this.headers = this.headersDevices;
    this.deviceService.getDevices().subscribe(
      (data)=>{
        this.devicesDTO = data;
        this.entity = 2;
      },
      error => {
        this.buttonNumber = -1;
        this.errorMessage = error.error.message;
      }
    );
  }

  seeUsers():void{
    this.buttonNumber = 1;
    this.headers = this.headersUsers;
    this.userService.getUsers().subscribe(
      (data)=>{
        this.usersDTO = data;
        this.entity = 1;
      },
      error => {
        this.buttonNumber = -1;
        this.errorMessage = error.error.message;
      }
    );
  }

}

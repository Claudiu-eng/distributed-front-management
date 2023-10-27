import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RegisterDTO} from "../../dto/RegisterDTO";
import {UserService} from "../../service/UserService/user.service";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {

  @Input() buttonText!: string;
  @Input() userDTO!: RegisterDTO;
  @Input() title!:string


  @Output() valueEmitted = new EventEmitter<{ message: string, status: number }>();
  @Input() isEdit!:boolean;
  @Input() items!:string[];

  selectedRole: string = "USER";

  constructor(private userService:UserService) {
  }

  changeRole(e:any):void {
    this.selectedRole = e.target.value;
  }

  save():void{
    this.userDTO.role = [this.selectedRole];
    if(!this.isEdit) {
      this.userService.register(this.userDTO).subscribe(
        data => {
          const data1 = {
            message: 'All is good!',
            status: 0
          };
          this.valueEmitted.emit(data1);
        },
        error => {
          const data1 = {
            message: error.error.message,
            status: -1
          };
          this.valueEmitted.emit(data1);
        }
      );
    }else {
      this.userService.update(this.userDTO).subscribe(
        data => {
          const data1 = {
            message: 'All is good!',
            status: 0
          };
          this.valueEmitted.emit(data1);
        },
        error => {
          const data1 = {
            message: error.error.message,
            status: -1
          };
          this.valueEmitted.emit(data1);
        }
      );
    }
  }

  exit(){
    const data1 = {
      message: 'All is good!',
      status: 0
    };
    this.valueEmitted.emit(data1);
  }

}

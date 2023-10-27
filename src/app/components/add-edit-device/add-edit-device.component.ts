import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DeviceDTO} from "../../dto/DeviceDTO";
import {DeviceService} from "../../service/DeviceService/device.service";
import {UserDTO} from "../../dto/UserDTO";

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css']
})
export class AddEditDeviceComponent {
  @Input() buttonText!: string;
  @Input() deviceDTO!: DeviceDTO;
  @Input() title!:string


  @Output() valueEmitted = new EventEmitter<{ message: string, status: number }>();
  @Input() isEdit!:boolean;
  @Input() items!:UserDTO[];

  selectedUser: string = "";

  constructor(private deviceService:DeviceService) {
  }

  changeUser(e:any):void {
    this.selectedUser = e.target.value;
  }

  save():void{
    if(this.selectedUser.length === 0){
      this.deviceDTO.userId=this.items[0].id;
    }else{
      this.deviceDTO.userId = this.items.filter(item => item.email === this.selectedUser)[0].id;
    }
    if(!this.isEdit) {
      this.deviceService.insert(this.deviceDTO).subscribe(
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
      this.deviceService.update(this.deviceDTO).subscribe(
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

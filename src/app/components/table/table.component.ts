import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HeadersTableDTO} from "../../dto/HeadersTableDTO";
import {DeviceDTO} from "../../dto/DeviceDTO";
import {UserDTO} from "../../dto/UserDTO";
import {TokenService} from "../../service/TokenService/token.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  @Input() headers!:HeadersTableDTO;
  @Input() entity!:number;
  @Input() devicesDTO!: DeviceDTO[];
  @Input() usersDTO!: UserDTO[];
  @Output() valueEdited = new EventEmitter<string>();
  @Output() valueDeleted = new EventEmitter<string>();
  @Output() seeCalendar = new EventEmitter<any>();
  onlyUser!:boolean;
  selectedDate!: Date;

  constructor(private tokenService:TokenService) { }
  ngOnInit(): void {
    const tokenDecoded = this.tokenService.decode();
    if (tokenDecoded) {
      if(tokenDecoded.role.includes("ADMIN"))
        this.onlyUser = false;
      else this.onlyUser = true;
    }
  }

  handleClick1(id:string){
    this.valueEdited.emit(id);
  }
  handleClick2(id:string){
    this.valueDeleted.emit(id);
  }
  handleClick3(id:string){
    const  date = this.selectedDate;
    if(date)
      this.seeCalendar.emit({id,date});
  }

}

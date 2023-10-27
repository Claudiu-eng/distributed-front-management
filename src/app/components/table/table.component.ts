import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HeadersTableDTO} from "../../dto/HeadersTableDTO";
import {DeviceDTO} from "../../dto/DeviceDTO";
import {UserDTO} from "../../dto/UserDTO";

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
  ngOnInit(): void {
  }

  handleClick1(id:string){
    this.valueEdited.emit(id);
  }
  handleClick2(id:string){
    this.valueDeleted.emit(id);
  }


}

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert-pop-up',
  templateUrl: './alert-pop-up.component.html',
  styleUrls: ['./alert-pop-up.component.css']
})
export class AlertPopUpComponent {

    constructor() { }

    @Input() message!: string;
    @Output() valueEmitted = new EventEmitter<{ message: string, status: number }>();

  exit(){
    const data1 = {
      message: 'All is good!',
      status: 0
    };
    this.valueEmitted.emit(data1);
  }


}

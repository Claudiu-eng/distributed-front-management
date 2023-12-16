import {Component, OnInit} from '@angular/core';
import {DeviceDTO} from "../../dto/DeviceDTO";
import {TokenService} from "../../service/TokenService/token.service";
import {Router} from "@angular/router";
import {DeviceService} from "../../service/DeviceService/device.service";
import {HeadersTableDTO} from "../../dto/HeadersTableDTO";
import {UserDTO} from "../../dto/UserDTO";
import Chart from 'chart.js/auto';
import 'chartjs-plugin-zoom';
import {WebSocketService} from "../../service/WebSocketService/web-socket.service";
import {MeasureService} from "../../service/MeasureService/measure.service";


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {


  devicesDTO!: DeviceDTO[]
  username !: string;
  chat!: boolean;
  headers: HeadersTableDTO = {
    first: "Id",
    second: "Address",
    third: "Maxim Hourly Energy",
    fourth: "Description",
    fifth: "User"
  }
  admin:string = "superadmin@gmail.com";
  chart: any = [];
  showAlert!: boolean;
  message!: string;

  constructor(private tokenService: TokenService, private router: Router,
              private deviceService: DeviceService, private webSocketService: WebSocketService,
              private measureService: MeasureService) {
  }

  ngOnInit(): void {
    this.showAlert = false;
    this.chat = false;
    const tokenDecoded = this.tokenService.decode();
    if (tokenDecoded) {
      this.username = tokenDecoded.sub;
      this.deviceService.getDevicesById(tokenDecoded.id).subscribe(data => {
        this.devicesDTO = data;
        this.webSocketService.connect("http://localhost:8095/socket");
        this.devicesDTO.forEach(device => {
          this.webSocketService.stompClient.connect({}, (frame: any) => {
            this.webSocketService.stompClient.subscribe("/topic/socket/notifications/" + device.id, (notification) => {
              this.message = notification.body;
              this.showAlert = true;
            });
          });
        })
      });

    }

    this.createChart([],[]);

  }

  openChat(): void {

    this.chat = true;
  }

  closeUserChat(user: string): void {
    this.chat = false;
  }

  closeAlert(id: string) {
    this.showAlert = false;
  };

  createChart(labels:any,dates:any) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Energy Consuption',
            data: dates,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            offset: true,
            grid: {
              offset: true,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
      },
    });
  }

  seeCalendar(event: any) {
    const id: string = event.id;
    const date: string = event.date;

    this.measureService.getMeasuresByDeviceId(id, date).subscribe(data => {
      data.sort((a, b) => a.date - b.date);
      this.chart.data.labels = data.map(obj =>
        this.formatTimestamp(obj.date)
      );
      this.chart.data.datasets[0].data = data.map(obj => obj.value);
      this.chart.update();


    })
  }

  private formatTimestamp(timestamp: number): string {
    timestamp = timestamp * 1000;
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(seconds)}`;
  }

  private formatDigit(digit: number): string {
    return digit < 10 ? `0${digit}` : `${digit}`;
  }


}

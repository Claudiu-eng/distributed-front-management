import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  websocket!: WebSocket;
  stompClient!: CompatClient;
  constructor() { }


  connect(url:string) {
    const URL = "http://localhost:8095/socket";
    this.websocket = new SockJS(url);
    this.stompClient = Stomp.over(this.websocket);

  }

}

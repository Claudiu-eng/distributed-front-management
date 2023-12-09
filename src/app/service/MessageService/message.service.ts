import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageDTO} from "../../dto/MessageDTO";
import {elements} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8085/api/message';
  constructor(private httpClient: HttpClient) { }

  sendMessage(message: string, recipient: string, emitter: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.post<MessageDTO>(`${this.baseUrl}/${emitter}/${recipient}`, message, { headers });
  }
  getMessages(emitter: string, recipient: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.get<MessageDTO[]>(`${this.baseUrl}/${emitter}/${recipient}`, { headers });
  }

  markAsRead(messages: string[]) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.post(`${this.baseUrl}`,messages, { headers });
  }

  sendIsTypingOrNoNotification(emitter: string, recipient: string, message: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    if (message ==='' || message === null){
      message = 'no';
    }
    return this.httpClient.post(`${this.baseUrl}/typing/${emitter}/${recipient}`,message, { headers });
  }

}

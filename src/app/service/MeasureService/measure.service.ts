import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DeviceDTO} from "../../dto/DeviceDTO";
import {MeasureDTO} from "../../dto/MeasureDTO";

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  private baseUrl = 'http://localhost:8095/api/monitoring';
  constructor(private httpClient: HttpClient) { }

  getMeasuresByDeviceId(id: string,date: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.httpClient.get<MeasureDTO[]>(`${this.baseUrl}/${id}/${date}`, { headers });
  }

}

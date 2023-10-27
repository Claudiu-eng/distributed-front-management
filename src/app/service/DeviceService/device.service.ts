import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DeviceDTO} from "../../dto/DeviceDTO";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseUrl = 'http://localhost:8090/api/device'

  constructor(private httpClient: HttpClient) {
  }

  getDevicesById(id: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.httpClient.get<DeviceDTO[]>(`${this.baseUrl}/all-devices-for-user/${id}`, { headers });
  }

  getDevices() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.httpClient.get<DeviceDTO[]>(`${this.baseUrl}/all-devices`, { headers });
  }

  insert(deviceDTO: DeviceDTO) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.post(`${this.baseUrl}`, deviceDTO,{ headers });

  }

  deleteDevice(id: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  update(deviceDTO: DeviceDTO) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.put(`${this.baseUrl}/${deviceDTO.id}`, deviceDTO,{ headers });
  }
}

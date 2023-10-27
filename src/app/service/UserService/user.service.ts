import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserDTO} from "../../dto/UserDTO";
import {RegisterDTO} from "../../dto/RegisterDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrlAdmin = 'http://localhost:8080/api/admin';
  private baseUrlUser = 'http://localhost:8080/api/user'

  constructor(private httpClient: HttpClient) {
  }

  getUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });

    return this.httpClient.get<UserDTO[]>(`${this.baseUrlAdmin}/all-users`, { headers });
  }


  register(userDTO: RegisterDTO) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.post(`${this.baseUrlUser}/register`, userDTO, { headers });
  }


  deleteUser(id: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.delete(`${this.baseUrlAdmin}/${id}`, { headers });
  }


  update(userDTO: RegisterDTO) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    });
    return this.httpClient.put(`${this.baseUrlAdmin}`, userDTO,{ headers });
  }
}

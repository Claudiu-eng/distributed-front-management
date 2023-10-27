import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationRequestDTO} from "../../dto/AuthenticationRequestDTO";
import {AuthenticationResponseDTO} from "../../dto/AuthenticationResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private baseUrlUser = 'http://localhost:8080/api/user'

  constructor(private httpClient: HttpClient) {
  }

  public logIn(user: AuthenticationRequestDTO): Observable<AuthenticationResponseDTO> {
    return this.httpClient.post<AuthenticationResponseDTO>(`${this.baseUrlUser}/authenticate`,user);
  }

}

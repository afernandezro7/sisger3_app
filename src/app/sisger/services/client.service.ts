import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiBaseUrl = environment.apiBaseUrl

  constructor(private http:HttpClient) { }

  getClientById(idClient:number):Observable<Client> {
    const url: string = `${this.apiBaseUrl}/client/${idClient}`
    return this.http.get<Client>(url)
  }


}

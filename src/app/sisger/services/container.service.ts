import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contenedor } from '../interfaces/container.interface';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private apiBaseUrl = environment.apiBaseUrl

  constructor(private http:HttpClient) { }

  getContainerById(idContainer:number):Observable<Contenedor> {
    const url: string = `${this.apiBaseUrl}/contenedor/${idContainer}`
    return this.http.get<Contenedor>(url)
  }

  setStatusToBultos() {
    // this.http.post(url,)
  }
}

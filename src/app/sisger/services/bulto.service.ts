import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Bulto, PResponse } from '../interfaces/container.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BultoService {

  private apiBaseUrl = environment.apiBaseUrl

  constructor(private http:HttpClient) { }

  updateBultoById(idBulto:number, data:Bulto):Observable<PResponse<Bulto>> {
    const url: string = `${this.apiBaseUrl}/bulto/${idBulto}`
    return this.http.put<PResponse<Bulto>>( url , data )
  }

}

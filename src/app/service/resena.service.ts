import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseResenas } from '../models/mesa.models.js';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  obtenerResenas(): Observable<ResponseResenas> {
    return this.http.get<ResponseResenas>('http://localhost:3000/api/resenas');
  }

  crearResena(nroPed: number, resena: { cuerpo: string; puntaje: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${nroPed}/resena`, resena);
  }

  modificarResena(nroPed: number, resena: { cuerpo: string; puntaje: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${nroPed}/resena`, resena);
  }

  eliminarResena(nroPed: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${nroPed}/resena`);
  }
}




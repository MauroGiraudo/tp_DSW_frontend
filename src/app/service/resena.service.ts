import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseResenas } from '../models/mesa.models';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl = 'http://localhost:3000/api/clientes';

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
  ) {}

  obtenerResenas(): Observable<ResponseResenas> {
    return this.http.get<ResponseResenas>('http://localhost:3000/api/resenas');
  }

  crearResena(nroPed: number, resena: { cuerpo: string; puntaje: number }): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    return this.http.post(`${this.apiUrl}/${clienteId}/pedidos/${nroPed}/resena`, resena);
  }

  modificarResena(nroPed: number, resena: { cuerpo: string; puntaje: number }): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    return this.http.put(`${this.apiUrl}/${clienteId}/pedidos/${nroPed}/resena`, resena);
  }

  eliminarResena(nroPed: number): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    return this.http.delete(`${this.apiUrl}/${clienteId}/pedidos/${nroPed}/resena`);
  }
}




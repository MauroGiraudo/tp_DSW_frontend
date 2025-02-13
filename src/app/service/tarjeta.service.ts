import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl = 'http://localhost:3000/api/clientes'; 

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService 
  ) { }

  obtenerTarjetaCliente(): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/tarjetas`;  
    return this.http.get<any>(url);
  }

  crearTarjetaCliente(tarjetaClienteData: any): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/tarjetas`;
    return this.http.post(url, tarjetaClienteData);
  }

  eliminarTarjeta(clienteId: number, tarjetaId: number): Observable<any> {
    const url = `${this.apiUrl}/${clienteId}/tarjetas/${tarjetaId}`;
    return this.http.delete<any>(url);
  }
}

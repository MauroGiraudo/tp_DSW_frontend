import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service'; // Asegúrate de que la ruta sea correcta
import { TarjetaCliente } from '../tarjeta-cliente/tarjetaCliente.entity.js';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl = 'http://localhost:3000/api/clientes';  // Base URL de la API

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService  // Para obtener el ID del cliente actual
  ) { }

  /**
   * Obtiene las tarjetas del cliente actual
   */
  obtenerTarjetaCliente(): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/tarjetas`;
    return this.http.get<any>(url);
  }

  /**
   * Crea una nueva tarjeta para el cliente actual
   * @param tarjetaClienteData Datos de la tarjeta a crear
   */
  crearTarjetaCliente(tarjetaClienteData: any): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/tarjetas`;
    return this.http.post<any>(url, tarjetaClienteData);
  }


  eliminarTarjeta(clienteId: number, tarjetaId: number): Observable<any> {
    const url = `${this.apiUrl}/${clienteId}/tarjetas/${tarjetaId}`;  // URL para eliminar la tarjeta
    return this.http.delete<any>(url);
  }
}

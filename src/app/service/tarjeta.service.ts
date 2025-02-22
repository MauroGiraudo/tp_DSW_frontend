import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  /**
   * @param tarjetaClienteData Datos de la tarjeta a crear
   */
  crearTarjetaCliente(tarjetaClienteData: any): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/tarjetas`; 
    return this.http.post<any>(url, tarjetaClienteData);
  }

  /**
   * @param clienteId ID del cliente
   * @param tarjetaId ID de la tarjeta a modificar
   * @param tarjetaModificada Datos actualizados de la tarjeta
   */
  modificarTarjetaCliente(tarjetaId: number, tarjetaModificada: any): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/tarjetas/${tarjetaId}`;
    return this.http.put<any>(url, tarjetaModificada).pipe(
      catchError(error => {
        console.error('Error al modificar la tarjeta:', error);
        return throwError(() => new Error('Error al modificar la tarjeta.'));
      })
    );
  }

  /**
   * @param clienteId ID del cliente
   * @param tarjetaId ID de la tarjeta a eliminar
   */
  eliminarTarjeta(clienteId: number, tarjetaId: number): Observable<any> {
    const url = `${this.apiUrl}/${clienteId}/tarjetas/${tarjetaId}`;
    return this.http.delete<any>(url).pipe(
      catchError(error => {
        console.error('Error al eliminar la tarjeta:', error);
        return throwError(() => new Error('Error al eliminar la tarjeta.'));
      })
    );
  }
}


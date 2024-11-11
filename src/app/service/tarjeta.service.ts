import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';  // Importa tu servicio de usuario para obtener el cliente actual
import { map } from 'rxjs/operators';  // Importa el operador map

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl = 'http://localhost:3000/api/clientes';  // URL base de la API

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService  // Inyectamos el servicio de usuario para obtener el cliente actual
  ) { }

  // Método para obtener la primera tarjeta del cliente
  obtenerTarjetaCliente(): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;  // Obtener el ID del cliente actual
    const url = `${this.apiUrl}/${clienteId}/tarjetas`;  // Obtener la lista de tarjetas del cliente

    return this.http.get<any>(url).pipe(
      // Accedemos a la propiedad 'data' y luego retornamos la primera tarjeta de la lista
      map(response => response.data && response.data.length > 0 ? response.data[0] : null)
    );
  }
}



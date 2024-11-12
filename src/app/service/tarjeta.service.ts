import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { map } from 'rxjs/operators'; 

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

    return this.http.get<any>(url).pipe(
      map(response => response.data && response.data.length > 0 ? response.data[0] : null)
    );
  }
}



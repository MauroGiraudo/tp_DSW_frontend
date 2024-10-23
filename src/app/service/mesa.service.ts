import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseMesas } from '../models/mesa.models.js';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private apiUrl = 'http://localhost:3000/api/mesas'; // Cambia esta URL a la de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener las mesas
  getMesas(): Observable<ResponseMesas> {
    return this.http.get<ResponseMesas>(this.apiUrl).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para actualizar el estado de una mesa con PATCH
  actualizarEstadoMesa(mesaId: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${mesaId}`; // Cambia según cómo esté estructurada tu API
    const body = { estado: nuevoEstado }; // Cuerpo de la solicitud

    return this.http.patch(url, body).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error) {
      // Para el lado del servidor
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.error.message || error.message}`;
    } else {
      // Errores del lado del cliente
      errorMessage = `Error: ${error.message}`;
    }
    console.error(errorMessage); // Para depuración
    return throwError(() => new Error(errorMessage)); // Devuelve un error
  }
}

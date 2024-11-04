import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mesa } from '../models/mesa.models.js';
import { Observable, tap } from 'rxjs';
import { ResponseMesas } from '../models/mesa.models.js'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private readonly apiUrl = 'http://localhost:3000/api/mesas'; // URL de la API para mesas

  constructor(private http: HttpClient) {}

  // Método para crear una nueva mesa
  public crearMesa(mesa: Mesa): Observable<Mesa> {
    const url = this.apiUrl; // URL de la API para crear una nueva mesa
    return this.http.post<Mesa>(url, {
      estado: mesa.estado,  // Estado de la mesa
      cantPersonasMax: mesa.cant_personas_max, // Usar camelCase para el backend
      nro_mesa: mesa.nro_mesa // Número de la mesa
    }).pipe(
      tap({
        next: (response) => {
          console.log('Mesa creada:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al crear la mesa:', error); // Manejo de error
        }
      })
    );
  }

  // Método para obtener todas las mesas
  public getMesas(): Observable<ResponseMesas> { // Cambia el tipo de retorno a ResponseMesas
    return this.http.get<ResponseMesas>(this.apiUrl).pipe(
      tap({
        next: (response) => {
          console.log('Mesas obtenidas:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al obtener mesas:', error); // Manejo de error
        }
      })
    );
  }

  // Método para obtener una mesa por su ID
  public obtenerMesa(mesaId: number): Observable<Mesa> {
    const url = `${this.apiUrl}/${mesaId}`; // URL para obtener la mesa específica
    return this.http.get<Mesa>(url).pipe(
      tap({
        next: (response) => {
          console.log('Mesa obtenida:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al obtener la mesa:', error); // Manejo de error
        }
      })
    );
  }

  // Método para actualizar una mesa
  public actualizarMesa(mesaId: number, mesaActualizada: Partial<Mesa>): Observable<Mesa> {
    const url = `${this.apiUrl}/${mesaId}`;
    return this.http.patch<Mesa>(url, {
      ...mesaActualizada, // Descompone los campos del objeto a enviar
      cantPersonasMax: mesaActualizada.cant_personas_max, // Asegúrate de que esté en camelCase
      nro_mesa: mesaActualizada.nro_mesa // Asegúrate de que esté en camelCase
    }).pipe(
      tap({
        next: (response) => {
          console.log('Mesa actualizada:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al actualizar la mesa:', error); // Manejo de error
        }
      })
    );
  }

  // Método para actualizar el estado de una mesa (opcional, puedes combinarlo)
  public actualizarEstadoMesa(mesaId: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${mesaId}`;
    const body = { estado: nuevoEstado }; // Enviamos solo el nuevo estado
    return this.http.patch(url, body);
  }

  // Método para eliminar una mesa por su número de mesa
  public eliminarMesa(mesaId: number): Observable<void> {
    const url = `${this.apiUrl}/${mesaId}`; // URL para eliminar la mesa específica
    return this.http.delete<void>(url).pipe(
      tap({
        next: () => {
          console.log(`Mesa con ID ${mesaId} eliminada exitosamente.`); // Mensaje de éxito en consola
        },
        error: (error) => {
          console.error(`Error al eliminar la mesa con ID ${mesaId}:`, error); // Manejo de error
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipoplato } from '../models/mesa.models.js';
import { Observable, tap } from 'rxjs';
import { ResponseTipoplato } from '../models/mesa.models.js';

@Injectable({
  providedIn: 'root'
})
export class TipoplatoService {
  private readonly apiUrl = 'http://localhost:3000/api/platos/tipos'; // URL de la API para tipos de platos

  constructor(private http: HttpClient) {}

  // Método para crear un nuevo tipo de plato
  public crearTipoPlato(tipoPlato: Tipoplato): Observable<Tipoplato> {
    const url = this.apiUrl; // URL de la API para crear un nuevo tipo de plato
    return this.http.post<Tipoplato>(url, {
      numPlato: tipoPlato.numPlato,  // Número del tipo de plato
      descTPlato: tipoPlato.descTPlato  // Descripción del tipo de plato
    }).pipe(
      tap({
        next: (response) => {
          console.log('Tipo de plato creado:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al crear el tipo de plato:', error); // Manejo de error
        }
      })
    );
  }

  // Método para obtener todos los tipos de platos
  public getTipoPlatos(): Observable<ResponseTipoplato> {
    return this.http.get<ResponseTipoplato>(this.apiUrl).pipe(
      tap({
        next: (response) => {
          console.log('Tipos de platos obtenidos:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al obtener tipos de platos:', error); // Manejo de error
        }
      })
    );
  }

  // Método para obtener un tipo de plato por su ID
  public obtenerTipoPlato(numPlato: number): Observable<Tipoplato> {
    const url = `${this.apiUrl}/${numPlato}`; // URL para obtener el tipo de plato específico
    return this.http.get<Tipoplato>(url).pipe(
      tap({
        next: (response) => {
          console.log('Tipo de plato obtenido:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al obtener el tipo de plato:', error); // Manejo de error
        }
      })
    );
  }

  // Método para actualizar un tipo de plato
  public actualizarTipoPlato(numPlato: number, tipoPlatoActualizado: Partial<Tipoplato>): Observable<Tipoplato> {
    const url = `${this.apiUrl}/${numPlato}`;
    return this.http.patch<Tipoplato>(url, {
      ...tipoPlatoActualizado, // Descompone los campos del objeto a enviar
      numPlato: tipoPlatoActualizado.numPlato, 
      descTPlato: tipoPlatoActualizado.descTPlato 
    }).pipe(
      tap({
        next: (response) => {
          console.log('Tipo de plato actualizado:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al actualizar el tipo de plato:', error); // Manejo de error
        }
      })
    );
  }

  // Método para eliminar un tipo de plato por su ID
  public eliminarTipoPlato(numPlato: number): Observable<void> {
    const url = `${this.apiUrl}/${numPlato}`; // URL para eliminar el tipo de plato específico
    return this.http.delete<void>(url).pipe(
      tap({
        next: () => {
          console.log(`Tipo de plato con ID ${numPlato} eliminado exitosamente.`); // Mensaje de éxito en consola
        },
        error: (error) => {
          console.error(`Error al eliminar el tipo de plato con ID ${numPlato}:`, error); // Manejo de error
        }
      })
    );
  }
}

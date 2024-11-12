import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Plato } from '../models/mesa.models.js';
import { ResponsePlato } from '../models/mesa.models.js';
@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private readonly apiUrl = 'http://localhost:3000/api/platos'; // URL de la API para platos

  constructor(private http: HttpClient) {}

  public crearPlato(plato: Plato): Observable<Plato> {
    return this.http.post<Plato>(this.apiUrl, {
      descripcion: plato.descripcion,
      tiempo: plato.tiempo,
      precio: plato.precio,
      aptoCeliaco: plato.aptoCeliaco,
      aptoVegetarianos: plato.aptoVegetarianos,
      aptoVeganos: plato.aptoVeganos,
      imagen: plato.imagen,
      tipoPlato: plato.tipoPlato
    }).pipe(
      tap({
        next: (response) => {
          console.log('Plato creado:', response);
        },
        error: (error) => {
          console.error('Error al crear el plato:', error);
        }
      })
    );
  }

  public getPlatos(): Observable<ResponsePlato> {
    return this.http.get<ResponsePlato>(this.apiUrl).pipe(
      tap({
        next: (response) => {
          console.log('Platos obtenidos:', response);
        },
        error: (error) => {
          console.error('Error al obtener platos:', error);
        }
      })
    );
  }

  public obtenerPlato(numPlato: number): Observable<Plato> {
    const url = `${this.apiUrl}/${numPlato}`;
    return this.http.get<Plato>(url).pipe(
      tap({
        next: (response) => {
          console.log('Plato obtenido:', response);
        },
        error: (error) => {
          console.error('Error al obtener el plato:', error);
        }
      })
    );
  }

  public actualizarPlato(numPlato: number, platoActualizado: Partial<Plato>): Observable<Plato> {
    const url = `${this.apiUrl}/${numPlato}`;
    return this.http.patch<Plato>(url, {
      ...platoActualizado
    }).pipe(
      tap({
        next: (response) => {
          console.log('Plato actualizado:', response);
        },
        error: (error) => {
          console.error('Error al actualizar el plato:', error);
        }
      })
    );
  }

  // Método para eliminar dependencias de plato en plato_de_tipo
  private eliminarDependenciasDePlato(numPlato: number, tipoPlato: number): Observable<void> {
    const url = `${this.apiUrl}/${numPlato}/tipo/${tipoPlato}`;
    return this.http.delete<void>(url).pipe(
      tap({
        next: () => {
          console.log(`Dependencias del plato con número ${numPlato} eliminadas.`);
        },
        error: (error) => {
          console.error(`Error al eliminar dependencias del plato con número ${numPlato}:`, error);
        }
      })
    );
  }

  // Método para eliminar un plato y sus dependencias en cascada
  public eliminarPlatoConDependencias(numPlato: number, tipoPlato: number): Observable<void> {
    return this.eliminarDependenciasDePlato(numPlato, tipoPlato).pipe(
      tap({
        next: () => {
          this.eliminarPlato(numPlato).subscribe({
            next: () => {
              console.log('Plato eliminado exitosamente con dependencias');
            },
            error: (error) => {
              console.error('Error al eliminar el plato:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error al eliminar dependencias del plato:', error);
        }
      })
    );
  }

  // Método para eliminar un plato por su ID
  public eliminarPlato(numPlato: number): Observable<void> {
    const url = `${this.apiUrl}/${numPlato}`;
    return this.http.delete<void>(url).pipe(
      tap({
        next: () => {
          console.log(`Plato con número ${numPlato} eliminado exitosamente.`);
        },
        error: (error) => {
          console.error(`Error al eliminar el plato con número ${numPlato}:`, error);
        }
      })
    );
  }
}

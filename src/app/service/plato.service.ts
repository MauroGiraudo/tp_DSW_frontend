import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Plato } from '../models/mesa.models.js';
import { ResponsePlato } from '../models/mesa.models.js';
import { Plato1 } from '../models/mesa.models.js';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private readonly apiUrl = 'http://localhost:3000/api/platos';

  constructor(private http: HttpClient) {}

  /** Crea un plato enviando la estructura correcta con ingredientes */
  public crearPlato(plato: Plato1): Observable<Plato1> {
    return this.http.post<Plato1>(this.apiUrl, {
      descripcion: plato.descripcion,
      tiempo: plato.tiempo,
      precio: plato.precio,
      aptoCeliaco: plato.aptoCeliaco,
      aptoVegetarianos: plato.aptoVegetarianos,
      aptoVeganos: plato.aptoVeganos,
      imagen: plato.imagen,
      tipoPlato: plato.tipoPlato,
      ingredientes: plato.ingredientes // Se agregó el envío de ingredientes
    }).pipe(
      tap(response => console.log('Plato creado:', response))
    );
  }

  /** Obtiene todos los platos */
  public getPlatos(): Observable<ResponsePlato> {
    return this.http.get<ResponsePlato>(this.apiUrl).pipe(
      tap(response => console.log('Platos obtenidos:', response))
    );
  }

  /** Obtiene un plato específico por su número */
  public obtenerPlato(numPlato: number): Observable<Plato1> {
    return this.http.get<Plato1>(`${this.apiUrl}/${numPlato}`).pipe(
      tap(response => console.log('Plato obtenido:', response))
    );
  }

  /** Actualiza los datos de un plato */
  public actualizarPlato(numPlato: number, platoActualizado: Partial<Plato1>): Observable<Plato1> {
    return this.http.patch<Plato1>(`${this.apiUrl}/${numPlato}`, platoActualizado).pipe(
      tap(response => console.log('Plato actualizado:', response))
    );
  }

  /** Elimina dependencias de un plato antes de eliminarlo */
  private eliminarDependenciasDePlato(numPlato: number, tipoPlato: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numPlato}/tipo/${tipoPlato}`).pipe(
      tap(() => console.log(`Dependencias del plato ${numPlato} eliminadas.`))
    );
  }

  /** Elimina un plato junto con sus dependencias */
  public eliminarPlatoConDependencias(numPlato: number, tipoPlato: number): Observable<void> {
    return this.eliminarDependenciasDePlato(numPlato, tipoPlato).pipe(
      switchMap(() => this.eliminarPlato(numPlato)), // Encadena la eliminación del plato
      tap(() => console.log(`Plato ${numPlato} eliminado exitosamente con dependencias`))
    );
  }

  /** Elimina un plato por su número */
  public eliminarPlato(numPlato: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numPlato}`).pipe(
      tap(() => console.log(`Plato ${numPlato} eliminado.`))
    );
  }
}


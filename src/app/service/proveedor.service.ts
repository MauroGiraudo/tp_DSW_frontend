import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/mesa.models.js'; // Ajusta la ruta de acuerdo a la ubicación de tu archivo
import { Observable, tap, map } from 'rxjs';
import { ResponseProveedores } from '../models/mesa.models.js';// Ajusta la ruta de acuerdo a la ubicación de tu archivo

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private readonly apiUrl = 'http://localhost:3000/api/proveedores'; // URL de la API para proveedores

  constructor(private http: HttpClient) {}

  // Método para crear un nuevo proveedor
  public crearProveedor(proveedor: Proveedor): Observable<Proveedor> {
    const url = this.apiUrl; // URL de la API para crear un nuevo proveedor
    return this.http.post<Proveedor>(url, {
      cuit: proveedor.cuit,  // CUIT del proveedor
      razonSocial: proveedor.razonSocial, // Razón social del proveedor
      direccion: proveedor.direccion, // Dirección del proveedor
      ciudad: proveedor.ciudad, // Ciudad del proveedor
      provincia: proveedor.provincia, // Provincia del proveedor
      pais: proveedor.pais, // País del proveedor
      telefono: proveedor.telefono, // Teléfono del proveedor
      email: proveedor.email // Email del proveedor
    }).pipe(
      tap({
        next: (response) => {
          console.log('Proveedor creado:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al crear el proveedor:', error); // Manejo de error
        }
      })
    );
  }

  // Método para obtener todos los proveedores
  getProveedores(): Observable<ResponseProveedores> {
  return this.http.get<ResponseProveedores>(this.apiUrl).pipe(
    tap({
      next: (response) => {
        console.log('Proveedores obtenidos:', response); // Manejo de respuesta exitosa
      },
      error: (error) => {
        console.error('Error al obtener proveedores:', error); // Manejo de error
      }
    })
  );
}

  // Método para obtener un proveedor por su ID
  public obtenerProveedor(proveedorId: number): Observable<Proveedor> {
    const url = `${this.apiUrl}/${proveedorId}`; // URL para obtener el proveedor específico
    return this.http.get<Proveedor>(url).pipe(
      tap({
        next: (response) => {
          console.log('Proveedor obtenido:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al obtener el proveedor:', error); // Manejo de error
        }
      })
    );
  }

  // Método para actualizar un proveedor
  public actualizarProveedor(proveedorId: number, proveedorActualizado: Partial<Proveedor>): Observable<Proveedor> {
    const url = `${this.apiUrl}/${proveedorId}`;
    return this.http.patch<Proveedor>(url, {
      ...proveedorActualizado, // Descompone los campos del objeto a enviar
      cuit: proveedorActualizado.cuit, 
      razonSocial: proveedorActualizado.razonSocial, 
      direccion: proveedorActualizado.direccion, 
      ciudad: proveedorActualizado.ciudad, 
      provincia: proveedorActualizado.provincia, 
      pais: proveedorActualizado.pais, 
      telefono: proveedorActualizado.telefono, 
      email: proveedorActualizado.email 
    }).pipe(
      tap({
        next: (response) => {
          console.log('Proveedor actualizado:', response); // Manejo de respuesta exitosa
        },
        error: (error) => {
          console.error('Error al actualizar el proveedor:', error); // Manejo de error
        }
      })
    );
  }

  // Método para eliminar un proveedor por su ID
  public eliminarProveedor(proveedorId: number): Observable<void> {
    const url = `${this.apiUrl}/${proveedorId}`; // URL para eliminar el proveedor específico
    return this.http.delete<void>(url).pipe(
      tap({
        next: () => {
          console.log(`Proveedor con ID ${proveedorId} eliminado exitosamente.`); // Mensaje de éxito en consola
        },
        error: (error) => {
          console.error(`Error al eliminar el proveedor con ID ${proveedorId}:`, error); // Manejo de error
        }
      })
    );
  }
}

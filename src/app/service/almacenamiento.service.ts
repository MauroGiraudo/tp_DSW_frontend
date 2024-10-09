import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {

  private almacenamientoEnMemoria: {[key: string]: string} = {}

  setItem(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      this.almacenamientoEnMemoria[key] = value;
      console.warn('localStorage no está disponible, usando almacenamiento en memoria');
    }
  }

  getItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    } else {
      console.warn('localStorage no está disponible, usando almacenamiento en memoria');
      return this.almacenamientoEnMemoria[key] || null;
    }
  }

  removeItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      delete this.almacenamientoEnMemoria[key];
      console.warn('localStorage no está disponible, usando almacenamiento en memoria');
    }
  }
}

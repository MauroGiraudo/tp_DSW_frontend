import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogIn, UsuarioRegistro, UsuarioResponse } from '../shared/usuarioInterfaces.js';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../shared/usuario.entity.js';

const USER_KEY = 'Usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<any>(this.getUsuarioFromLocalStorage())
  public usuarioObservable: Observable<any>

  constructor(private http: HttpClient) {
    this.usuarioObservable = this.usuarioSubject.asObservable()
  }

  readonly urlUsuario = 'http://localhost:3000/api/usuarios'

  public registrarUsuario(usuario: UsuarioRegistro) {
    const url = this.urlUsuario + '/registro'
    console.log(usuario)
    return this.http.post(url, usuario)
  }

  public loginUsuario(usuario: UsuarioLogIn) {
    const url = this.urlUsuario + '/login'
    console.log(usuario)
    return this.http.post<UsuarioResponse>(url, usuario).pipe(tap({
      next: (response) => {
        this.setUsuarioToLocalStorage(response.data)
        this.usuarioSubject.next(response.data)
      },
      error: () => {

      }
    }))
  }

  private setUsuarioToLocalStorage(usuario: Usuario) {
    localStorage.setItem(USER_KEY, JSON.stringify(usuario))
  }

  private getUsuarioFromLocalStorage(): Usuario {
    const usuario = localStorage.getItem(USER_KEY)
    if(usuario) {
      return JSON.parse(usuario)
    } else {
      return new Usuario()
    }
  }

  public logOutUsuario() {
    this.usuarioSubject.next(new Usuario)
    localStorage.removeItem(USER_KEY)
    window.location.reload()
  }
}

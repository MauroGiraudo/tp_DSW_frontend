import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRegistro } from '../shared/usuarioRegistro.js';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) {  }

  private urlRegistro = 'http://localhost:3000/api/usuarios/registro'

  public registrarUsuario(usuario: UsuarioRegistro): Observable<UsuarioRegistro> {
    return this.http.post<UsuarioRegistro>(this.urlRegistro, usuario)
  }
}

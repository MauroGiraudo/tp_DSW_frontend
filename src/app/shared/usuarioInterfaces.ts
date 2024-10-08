import { Usuario } from "./usuario.entity.js"

export interface UsuarioRegistro {
  nombre: string,
  apellido: string,
  email: string,
  contrasenia: string,
  telefono: string | undefined,
  tipoUsuario: string
}

export interface UsuarioLogIn {
  email: string,
  contrasenia: string
}

export interface UsuarioResponse {
  message: string
  data: Usuario
}
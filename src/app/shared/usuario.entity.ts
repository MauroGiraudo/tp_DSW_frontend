export class Usuario {
    id!: number
    nombre!: string
    apellido!: string
    email!: string
    telefono?: string
    tipoUsuario!: string
    pedidos?: any[]
    tarjetasCliente?: any[]
}
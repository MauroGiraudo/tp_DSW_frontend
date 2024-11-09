export interface Mesa {
  nro_mesa: number; // o number, dependiendo de tu implementación
  cant_personas_max: number;
  estado: string;
}

export interface ResponseMesas {
  message: string; // Mensaje de respuesta del backend
  data: Mesa[]; // Arreglo de mesas
}

export interface Proveedor{
  id:number;
  cuit: string;
  razonSocial: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  pais: string;
  telefono: string;
  email: string;
  mostrarDetalles?: boolean;
}

export interface ResponseProveedores {
  message: string;  // Mensaje de respuesta del backend
  data: Proveedor[]; // Arreglo de proveedores
}

export interface Bebida{
  codBebida: number;
  descripcion: string;
  unidadMedida: string;
  contenido: number;
  precio: number;
  alcohol: string;
  imagen: string;
  proveedor: number;
}

export interface ResponseBebidas {
  message: string;  // Mensaje de respuesta del backend
  data: Bebida[]; // Arreglo de proveedores
}



export interface Mesa {
  nro_mesa: number; // o number, dependiendo de tu implementación
  cant_personas_max: number;
  estado: string;
}

export interface ResponseMesas {
  message: string; // Mensaje de respuesta del backend
  data: Mesa[]; // Arreglo de mesas
}


export interface ResponseMesas {
  message: string;
  data: Mesa[];
}
export interface ResponseMesas {
  message: string; // Propiedad que se requiere
  data: Mesa[]; // Asumiendo que tienes una interfaz Mesa que define los atributos de cada mesa
}

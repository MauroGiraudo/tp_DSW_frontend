export interface Mesa {
  nro_mesa: number;
  cant_personas_max: number;
  estado: string;
  codigo: string;
}

export interface ResponseMesas {
  message: string;
  data: Mesa[];
}
export interface ResponseMesas {
  message: string; // Propiedad que se requiere
  data: Mesa[]; // Asumiendo que tienes una interfaz Mesa que define los atributos de cada mesa
}

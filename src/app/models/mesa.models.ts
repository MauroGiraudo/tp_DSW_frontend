export interface Mesa {
  nro_mesa: number; // o number, dependiendo de tu implementación
  cant_personas_max: number;
  estado: string;
}

export interface ResponseMesas {
  message: string; // Mensaje de respuesta del backend
  data: Mesa[]; 
}

export interface ResponseMesa {
  message: string;
  data: Mesa;  // Aquí ahora es un objeto de tipo Mesa, no un arreglo
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
  data: Proveedor[]; 
}

export interface Bebida{
  codBebida: number;
  descripcion: string;
  stock: number;
  unidadMedida: string;
  contenido: number;
  precio: number;
  alcohol: string;
  imagen: string;
  proveedor: number;
}
export type BebidaConCantidad = Bebida & { cantidad: number };

export interface ResponseBebidas {
  message: string;  // Mensaje de respuesta del backend
  data: Bebida[];
}


export interface Tipoplato{
  numPlato: number;
  descTPlato: string;
}

export interface ResponseTipoplato {
  message: string;  // Mensaje de respuesta del backend
  data: Tipoplato[]; 
}

export interface Pedido{
  nroPed: number;
  platos: PlatoConCantidad[];
  bebidas: BebidaConCantidad[];
  enCurso: boolean;
}


export interface ResponsePedido {
  message: string;  // Mensaje de respuesta del backend
  data: Pedido[]; 
}

export interface Plato{
  numPlato: number;
  descripcion: string;
  tiempo: number;
  precio: number;
  aptoCeliaco: boolean;
  aptoVegetarianos: boolean;
  aptoVeganos: boolean;
  imagen: string;
  tipoPlato?: number;
}
export type PlatoConCantidad = Plato & { cantidad: number };

export interface ResponsePlato {
  message: string;  // Mensaje de respuesta del backend
  data: Plato[]; 
}

export interface PlatoPedido {
  numPlato: number;
  cantidad: number;
}

export interface BebidaPedido {
  codBebida: number;
  cantidad: number;
}

export interface PedidoActualiza {
  nroPed: number;
  platos: PlatoPedido[];  // Arreglo de platos con su cantidad
  bebidas: BebidaPedido[];  // Arreglo de bebidas con su cantidad
  enCurso: boolean;  // Indica si el pedido está en curso
}

export interface BebidaPedidoEst {
  pedido: Pedido;
  bebida: Bebida;
  fechaSolicitud: string;
  horaSolicitud: string;
  cantidad: number;
  fechaEntrega?: string;
  horaEntrega?: string;
  entregado: boolean;
}

export interface PlatoPedidosEst {
  pedido: Pedido;
  plato: Plato;
  fechaSolicitud: string;
  horaSolicitud: string;
  cantidad: number;
  fechaEntrega?: string;
  horaEntrega?: string;
  entregado: boolean;
}
export interface ResponsePlatoEst {
  message: string;  // Mensaje de respuesta del backend
  data: PlatoPedidosEst[]; 
}

export interface ResponseBebidaEst {
  message: string;  // Mensaje de respuesta del backend
  data: BebidaPedidoEst[]; 
}
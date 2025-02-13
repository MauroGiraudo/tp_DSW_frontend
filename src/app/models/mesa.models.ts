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

export interface Plato1 {
  numPlato: number;
  descripcion: string;
  tiempo: number;
  precio: number;
  aptoCeliaco: boolean;
  aptoVegetarianos: boolean;
  aptoVeganos: boolean;
  imagen: string;
  tipoPlato?: number;
  ingredientes: Ingrediente[]; // Se agregó la lista de ingredientes
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

export interface PedidosLis {
  nroPed: number;
  estado: string;
  fecha?: Date;
  hora?: string;
  fechaCancelacion?: Date;
  horaCancelacion?: string;
  cliente: number;
  mesa: number;
  //platosPedido = new Collection<PlatoPedido>(this)
  //bebidasPedido = new Collection<BebidaPedido>(this)
  pago: number;
  resena?: number;
  mostrarDetalles?: boolean;
}

export interface ResponsePedidosLis {
  message: string;  // Mensaje de respuesta del backend
  data: PedidosLis[]; 
}

export interface Ingrediente{
  codigo: number;
  descIngre: string;
  puntoDePedido: number;
  stock: number;
  unidadMedida: string;
  aptoCeliacos: boolean;
  aptoVegetarianos: boolean;
  aptoVeganos: boolean;
  mostrarDetalles?: boolean;
  proveedor?: number;
}

export interface ResponseIngredientes {
  message: string;  // Mensaje de respuesta del backend
  data: Ingrediente[]; 
}

export interface NuevoTipotarjeta{
  descTarjeta: string;
}

export interface Tipotarjeta{
  idTarjeta: number;
  descTarjeta: string;
}

export interface ResponseTipotarjeta {
  message: string;  // Mensaje de respuesta del backend
  data: Tipotarjeta[]; 
}

export interface PlatoIngrediente {
  ingrediente: Ingrediente;
  plato: Plato;
  cantidadNecesaria: number;
}

export interface Resena {
  fechaHoraResena: Date;
  fechaHoraModificacion?: Date;
  cuerpo: string;
  puntaje: number;
}

export interface ResponseResenas {
  message: string;
  data: Resena[];
}

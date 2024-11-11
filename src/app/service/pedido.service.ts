import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatoConCantidad, BebidaConCantidad,PlatoPedido,BebidaPedido } from '../models/mesa.models';
import { Observable,map,switchMap,of,throwError,forkJoin } from 'rxjs'; 
import { UsuarioService } from './usuario.service';
import { TarjetaService } from './tarjeta.service.js';
import { PedidoActualiza } from '../models/mesa.models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private platosPedido: PlatoConCantidad[] = [];
  private bebidasPedido: BebidaConCantidad[] = [];
  private pedidoEnCurso: boolean = false;
  
  private apiUrl = 'http://localhost:3000/api/clientes'; // Cambiar a la base URL

  constructor(private http: HttpClient, private usuarioService: UsuarioService, private tarjetaService: TarjetaService) { }

  // Agregar un plato al pedido o aumentar la cantidad si ya existe
  agregarPlatoAlPedido(plato: PlatoConCantidad): void {
    const platoExistente = this.platosPedido.find(p => p.numPlato === plato.numPlato);
    if (platoExistente) {
      platoExistente.cantidad += 1;
    } else {
      this.platosPedido.push({ ...plato, cantidad: 1 });
    }
  }

  // Agregar una bebida al pedido o aumentar la cantidad si ya existe
  agregarBebidaAlPedido(bebida: BebidaConCantidad): void {
    const bebidaExistente = this.bebidasPedido.find(b => b.codBebida === bebida.codBebida);
    if (bebidaExistente) {
      bebidaExistente.cantidad += 1;
    } else {
      this.bebidasPedido.push({ ...bebida, cantidad: 1 });
    }
  }

  // Obtener los platos y bebidas en el pedido
  obtenerPedido(): { platos: PlatoConCantidad[], bebidas: BebidaConCantidad[] } {
    return { platos: this.platosPedido, bebidas: this.bebidasPedido };
  }


// Método para obtener el pedido en curso del cliente
obtenerPedidoEnCurso(): Observable<any> {
  const clienteId = this.usuarioService.obtenerUsuarioActual().id;  // Obtener el clienteId
  const url = `${this.apiUrl}/${clienteId}/pedidos`;  // URL para obtener todos los pedidos
  return this.http.get<any>(url).pipe(
    map(response => {
      console.log('Respuesta completa:', response);  // Verifica la respuesta completa
      const pedidos = response.data;  // Accede a la propiedad 'data' que contiene el arreglo de pedidos
      if (Array.isArray(pedidos)) {
        const pedidoEnCurso = pedidos.find(pedido => pedido.estado === 'en curso');
        return pedidoEnCurso ? pedidoEnCurso.nroPed : null;  // Retorna el nroPed del pedido en curso, o null si no se encuentra
      } else {
        console.error('La propiedad "data" no es un arreglo:', pedidos);
        return null;
      }
    })
  );
}


  // Método para crear un nuevo pedido utilizando el clienteId del usuario logueado
  crearPedido(pedidoData: any): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    console.log('Cliente ID:', clienteId);  // Verifica el clienteId
    const url = `${this.apiUrl}/${clienteId}/pedidos`;
    return this.http.post(url, pedidoData);
  }

  // Confirmar el pedido utilizando el clienteId del usuario logueado
  confirmarPedido(pedidoData: any, nroPed: number): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/pedidos/${nroPed}`;
    return this.http.patch(url, pedidoData);
  }

actualizarPedidoEnCurso(nroPed: number, platos: PlatoPedido[], bebidas: BebidaPedido[]): Observable<any> {
  const clienteId = this.usuarioService.obtenerUsuarioActual().id;  // Obtener el clienteId

  // Primero, preparar los datos de las bebidas. Aquí usamos map() para cada bebida.
  const bebidasData = bebidas.map(bebida => ({
    bebida: bebida.codBebida,
    cantidad: bebida.cantidad || 1,  // Si no se especifica cantidad, usar 1
  }));

  // Luego, preparar los datos de los platos
  const platosData = platos.map(plato => ({
    plato: plato.numPlato,
    cantidad: plato.cantidad || 1,  // Si no se especifica cantidad, usar 1
  }));

  // Declarar 'requests' como un array de Observable<any>
  const requests: Observable<any>[] = [];

  // Si hay bebidas, creamos la solicitud
  if (bebidasData.length > 0) {
    bebidasData.forEach(bebida => {
      requests.push(
        this.http.post(
          `http://localhost:3000/api/pedidos/${nroPed}/bebidas`,
          bebida
        )
      );
    });
  }

  // Si hay platos, creamos la solicitud
  if (platosData.length > 0) {
    platosData.forEach(plato => {
      requests.push(
        this.http.post(
          `http://localhost:3000/api/pedidos/${nroPed}/platos`,
          plato
        )
      );
    });
  }

  // Si hay solicitudes, ejecutamos todas en paralelo
  if (requests.length > 0) {
    return forkJoin(requests);
  } else {
    return of(null);  // Si no hay platos ni bebidas, devolvemos un Observable vacío
  }
}


// En el servicio de pedidos (pedidoService)

recibido(nroPed: number, platos: PlatoPedido[], bebidas: BebidaPedido[]): Observable<any> {
  const clienteId = this.usuarioService.obtenerUsuarioActual().id;  // Obtener el clienteId

  // Crear las solicitudes para bebidas y platos
  const requests: Observable<any>[] = [];

  // Procesar las bebidas y agregar fecha y hora
 bebidas.forEach(bebida => {
  const fecha = new Date();
  const fechaSolicitud = fecha.toISOString().split('T')[0];  
  const horaSolicitud = fecha.toISOString().split('T')[1].split('.')[0];

  // Crear el objeto de datos a enviar
  const bebidaData = {
    fechaSolicitud: fechaSolicitud,
    horaSolicitud: horaSolicitud,
    cantidad: bebida.cantidad || 1,  // Si no se especifica cantidad, usar 1
  };

    // Agregar la solicitud PUT para cada bebida
    requests.push(
      this.http.put(
        `http://localhost:3000/api/pedidos/${nroPed}/bebidas/${bebida.codBebida}`,
        bebidaData
      )
    );
  });

  // Procesar los platos y agregar fecha y hora
  platos.forEach(plato => {
    const fecha = new Date();
    const fechaSolicitud = fecha.toISOString().split('T')[0];  // Fecha en formato YYYY-MM-DD
    const horaSolicitud = fecha.toISOString().split('T')[1].split('.')[0];  // Hora en formato HH:mm:ss

    const platoData = {
      fechaSolicitud: fechaSolicitud,
      horaSolicitud: horaSolicitud,
      cantidad: plato.cantidad || 1,  // Si no se especifica cantidad, usar 1
    };

    // Agregar la solicitud PUT para cada plato
    requests.push(
      this.http.put(
        `http://localhost:3000/api/pedidos/${nroPed}/platos/${plato.numPlato}`,
        platoData
      )
    );
  });

  // Ejecutamos todas las solicitudes en paralelo si hay alguna
  if (requests.length > 0) {
    return forkJoin(requests);  // Ejecutamos en paralelo
  } else {
    return of(null);  // Si no hay platos ni bebidas, devolvemos un Observable vacío
  }
}






  // Método para actualizar el pedido en curso con los platos y bebidas actuales
 finalizarPedido(nroPed: number, platos: PlatoPedido[], bebidas: BebidaPedido[], totalImporte: number): Observable<any> {
  const clienteId = this.usuarioService.obtenerUsuarioActual().id;  // Obtener el ID del cliente actual
  const url = `${this.apiUrl}/pedidos/${nroPed}`;  // URL para actualizar el pedido en curso

  // Primero, verificamos si existe un pago asociado al pedido
  return this.http.get(`${this.apiUrl}/pedidos/${nroPed}`).pipe(
    switchMap((pedidoActualizado: any) => {
      // Si el pedido no tiene un pago asociado, lo creamos
      if (!pedidoActualizado.pago) {
        return this.tarjetaService.obtenerTarjetaCliente().pipe(
          switchMap(tarjeta => {
            if (!tarjeta) {
              // Si no encontramos tarjeta, retornamos un error o lo que se considere
              return throwError(() => new Error('La tarjeta del cliente no se encuentra registrada'));
            }

            // Creamos el pago con la tarjeta que obtenemos
            const nuevoPago = {
              tarjetaCliente: tarjeta.idTarjeta,  // Usamos el id de la tarjeta obtenida
            };

            return this.http.post(`http://localhost:3000/api/pedidos/${nroPed}/pagos`, nuevoPago).pipe(
              switchMap((pagoCreado: any) => {
                // Si se crea el pago, agregamos el pago al pedido actualizado
                pedidoActualizado.pago = pagoCreado;

                // Ahora actualizamos los platos y bebidas
                const pedidoData = { platos, bebidas, totalImporte };
                return this.http.patch(`${this.apiUrl}/pedidos/${nroPed}`, pedidoData).pipe(
                  map(() => pedidoActualizado)  // Devolvemos el pedido con el pago y los platos/ bebidas actualizados
                );
              })
            );
          })
        );
      } else {
        // Si ya existe un pago, directamente actualizamos los platos y bebidas
        const pedidoData = { platos, bebidas, totalImporte };
        return this.http.patch(`${this.apiUrl}/pedidos/${nroPed}`, pedidoData).pipe(
          map(() => pedidoActualizado)  // Devolvemos el pedido con los platos/ bebidas actualizados
        );
      }
    })
  );
}


  // Actualizar la cantidad de un plato en el pedido
  actualizarCantidadPlato(numPlato: number, nuevaCantidad: number): void {
    const plato = this.platosPedido.find(p => p.numPlato === numPlato);
    if (plato) {
      plato.cantidad = nuevaCantidad;
      if (plato.cantidad === 0) {
        this.platosPedido = this.platosPedido.filter(p => p.numPlato !== numPlato);
      }
    }
  }

  // Actualizar la cantidad de una bebida en el pedido
  actualizarCantidadBebida(codBebida: number, nuevaCantidad: number): void {
    const bebida = this.bebidasPedido.find(b => b.codBebida === codBebida);
    if (bebida) {
      bebida.cantidad = nuevaCantidad;
      if (bebida.cantidad === 0) {
        this.bebidasPedido = this.bebidasPedido.filter(b => b.codBebida !== codBebida);
      }
    }
  }

  // Eliminar un plato del pedido por su número
  eliminarPlatoDelPedido(numPlato: number): void {
    this.platosPedido = this.platosPedido.filter(p => p.numPlato !== numPlato);
  }

  // Eliminar una bebida del pedido por su código
  eliminarBebidaDelPedido(codBebida: number): void {
    this.bebidasPedido = this.bebidasPedido.filter(b => b.codBebida !== codBebida);
  }
}

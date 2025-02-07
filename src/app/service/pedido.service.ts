import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatoConCantidad, BebidaConCantidad, PlatoPedido, BebidaPedido,PlatoPedidosEst, BebidaPedidoEst,PedidosLis } from '../models/mesa.models';
import { Observable, of, throwError, forkJoin,catchError } from 'rxjs'; 
import { map, switchMap } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { TarjetaService } from './tarjeta.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  private platosPedido: PlatoConCantidad[] = [];
  private bebidasPedido: BebidaConCantidad[] = [];
  private pedidoEnCurso: boolean = false;
  private apiUrl = 'http://localhost:3000/api/clientes';

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private tarjetaService: TarjetaService
  ) {}

  agregarPlatoAlPedido(plato: PlatoConCantidad): void {
    const platoExistente = this.platosPedido.find(p => p.numPlato === plato.numPlato);
    if (platoExistente) {
      platoExistente.cantidad += 1;
    } else {
      this.platosPedido.push({ ...plato, cantidad: 1 });
    }
  }

  agregarBebidaAlPedido(bebida: BebidaConCantidad): void {
    const bebidaExistente = this.bebidasPedido.find(b => b.codBebida === bebida.codBebida);
    if (bebidaExistente) {
      bebidaExistente.cantidad += 1;
    } else {
      this.bebidasPedido.push({ ...bebida, cantidad: 1 });
    }
  }

  obtenerPedido(): { platos: PlatoConCantidad[], bebidas: BebidaConCantidad[] } {
    return { platos: this.platosPedido, bebidas: this.bebidasPedido };
  }

  obtenerPedidoEnCurso(): Observable<number | null> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/pedidos`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const pedidos = response.data;
        if (Array.isArray(pedidos)) {
          const pedidoEnCurso = pedidos.find(pedido => pedido.estado === 'en curso');
          return pedidoEnCurso ? pedidoEnCurso.nroPed : null;
        }
        console.error('La propiedad "data" no es un arreglo:', pedidos);
        return null;
      })
    );
  }

  crearPedido(pedidoData: any): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/pedidos`;
    return this.http.post(url, pedidoData);
  }

  confirmarPedido(pedidoData: any, nroPed: number): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/${clienteId}/pedidos/${nroPed}`;
    return this.http.patch(url, pedidoData);
  }

  actualizarPedidoEnCurso(nroPed: number, platos: PlatoPedido[], bebidas: BebidaPedido[]): Observable<any> {
    const bebidasData = bebidas.map(bebida => ({
      bebida: bebida.codBebida,
      cantidad: bebida.cantidad || 1,
    }));
    const platosData = platos.map(plato => ({
      plato: plato.numPlato,
      cantidad: plato.cantidad || 1,
    }));
    
    const requests: Observable<any>[] = [];
    bebidasData.forEach(bebida => {
      requests.push(this.http.post(`http://localhost:3000/api/pedidos/${nroPed}/bebidas`, bebida));
    });
    platosData.forEach(plato => {
      requests.push(this.http.post(`http://localhost:3000/api/pedidos/${nroPed}/platos`, plato));
    });
    return requests.length > 0 ? forkJoin(requests) : of(null);
  }



  recibido(nroPed: number): Observable<any> {
    const obtenerPlatos = this.http.get<{ data: PlatoPedidosEst[] }>(`http://localhost:3000/api/pedidos/${nroPed}/platos`);
    const obtenerBebidas = this.http.get<{ data: BebidaPedidoEst[] }>(`http://localhost:3000/api/pedidos/${nroPed}/bebidas`);

    return forkJoin([obtenerPlatos, obtenerBebidas]).pipe(
      switchMap(([ResponsePlatoEst, ResponseBebidaEst]) => {
        const requests: Observable<any>[] = [];
        ResponseBebidaEst.data.forEach(bebida => {
          const bebidaData = { fechaSolicitud: bebida.fechaSolicitud, horaSolicitud: bebida.horaSolicitud, cantidad: bebida.cantidad };
          requests.push(this.http.put(`http://localhost:3000/api/pedidos/${nroPed}/bebidas/${bebida.bebida.codBebida}`, bebidaData));
        });
        ResponsePlatoEst.data.forEach(plato => {
          const platoData = { fechaSolicitud: plato.fechaSolicitud, horaSolicitud: plato.horaSolicitud, cantidad: plato.cantidad };
          requests.push(this.http.put(`http://localhost:3000/api/pedidos/${nroPed}/platos/${plato.plato.numPlato}`, platoData));
        });
        return requests.length > 0 ? forkJoin(requests) : of(null);
      })
    );
  }

  finalizarPedido(nroPed: number, platos: PlatoPedido[], bebidas: BebidaPedido[], totalImporte: number): Observable<any> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id;
    const url = `${this.apiUrl}/pedidos/${nroPed}`;

    return this.http.get(`${this.apiUrl}/pedidos/${nroPed}`).pipe(
      switchMap((pedidoActualizado: any) => {
        if (!pedidoActualizado.pago) {
          return this.tarjetaService.obtenerTarjetaCliente().pipe(
            switchMap(tarjeta => {
              if (!tarjeta) {
                return throwError(() => new Error('La tarjeta del cliente no se encuentra registrada'));
              }
              const nuevoPago = { tarjetaCliente: tarjeta.idTarjeta };
              return this.http.post(`http://localhost:3000/api/pedidos/${nroPed}/pagos`, nuevoPago).pipe(
                switchMap(pagoCreado => {
                  pedidoActualizado.pago = pagoCreado;
                  const pedidoData = { platos, bebidas, totalImporte };
                  return this.http.patch(url, pedidoData).pipe(map(() => pedidoActualizado));
                })
              );
            })
          );
        } else {
          const pedidoData = { platos, bebidas, totalImporte };
          return this.http.patch(url, pedidoData).pipe(map(() => pedidoActualizado));
        }
      })
    );
  }

  actualizarCantidadPlato(numPlato: number, nuevaCantidad: number): void {
    const plato = this.platosPedido.find(p => p.numPlato === numPlato);
    if (plato) {
      plato.cantidad = nuevaCantidad;
      if (plato.cantidad === 0) {
        this.platosPedido = this.platosPedido.filter(p => p.numPlato !== numPlato);
      }
    }
  }

  actualizarCantidadBebida(codBebida: number, nuevaCantidad: number): void {
    const bebida = this.bebidasPedido.find(b => b.codBebida === codBebida);
    if (bebida) {
      bebida.cantidad = nuevaCantidad;
      if (bebida.cantidad === 0) {
        this.bebidasPedido = this.bebidasPedido.filter(b => b.codBebida !== codBebida);
      }
    }
  }

  eliminarPlatoDelPedido(numPlato: number): void {
    this.platosPedido = this.platosPedido.filter(p => p.numPlato !== numPlato);
  }

  eliminarBebidaDelPedido(codBebida: number): void {
    this.bebidasPedido = this.bebidasPedido.filter(b => b.codBebida !== codBebida);
  }

  cancelarPedido(pedidoId: number): Observable<any> {
    const url = `${this.apiUrl}/pedidos/${pedidoId}/cancelar`;
    const body = { estado: 'cancelado' };
    return this.http.put(url, body);
  }

  obtenerPedidos(): Observable<PedidosLis[]> {
    const clienteId = this.usuarioService.obtenerUsuarioActual().id; 
    const url = `${this.apiUrl}/${clienteId}/pedidos`;  
    return this.http.get<{ data: PedidosLis[] }>(url).pipe( 
      map(response => {
        console.log('Pedidos obtenidos:', response);  
        return response.data;  
      }),
      catchError(error => {
        console.error('Error al obtener los pedidos:', error); 
        return throwError(() => new Error('No se pudieron obtener los pedidos del cliente'));
      })
    );
  }

  obtenerPlatosBebidasPorPedido(pedidoId: number): Observable<{ platos: PlatoConCantidad[], bebidas: BebidaConCantidad[] }> {
  // Hacer las solicitudes para obtener los platos y las bebidas
  const obtenerPlatos = this.http.get<{ data: any[] }>(`http://localhost:3000/api/pedidos/${pedidoId}/platos`);
  const obtenerBebidas = this.http.get<{ data: BebidaPedidoEst[] }>(`http://localhost:3000/api/pedidos/${pedidoId}/bebidas`);

  // Usamos forkJoin para esperar ambas respuestas
  return forkJoin([obtenerPlatos, obtenerBebidas]).pipe(
    map(([ResponsePlatoEst, ResponseBebidaEst]) => {
      // Adaptar los platos con la cantidad
      const platosAdaptados: PlatoConCantidad[] = ResponsePlatoEst.data.map(plato => ({
        numPlato: plato.plato.numPlato,
        descripcion: plato.plato.descripcion,
        tiempo: plato.plato.tiempo,
        precio: plato.plato.precio,
        cantidad: plato.cantidad,
        aptoCeliaco: plato.plato.aptoCeliaco,
        aptoVegetarianos: plato.plato.aptoVegetarianos,
        aptoVeganos: plato.plato.aptoVeganos,
        imagen: plato.plato.imagen,  // Corregido el typo de "imagents" a "imagen"
      }));

      // Adaptar las bebidas con la cantidad
      const bebidasAdaptadas: BebidaConCantidad[] = ResponseBebidaEst.data.map(bebida => ({
        codBebida: bebida.bebida.codBebida,
        descripcion: bebida.bebida.descripcion,
        stock: bebida.bebida.stock,
        unidadMedida: bebida.bebida.unidadMedida,
        contenido: bebida.bebida.contenido,
        precio: bebida.bebida.precio,
        alcohol: bebida.bebida.alcohol,
        imagen: bebida.bebida.imagen,
        proveedor: bebida.bebida.proveedor,
        cantidad: bebida.cantidad || 1,  // Asignar la cantidad, con valor por defecto si es undefined
      }));

      // Devolver los platos y las bebidas adaptadas
      return {
        platos: platosAdaptados,
        bebidas: bebidasAdaptadas
      };
    }),
    catchError(error => {
      console.error('Error al obtener los platos y bebidas del pedido:', error);
      return throwError(() => new Error('No se pudieron obtener los platos y bebidas del pedido. Intente nuevamente más tarde.'));
    })
  );
}

marcarPlatoComoRecibido(nroPed: number, numPlato: number): Observable<any> {
  return this.http.get<{ data: PlatoPedidosEst[] }>(`http://localhost:3000/api/pedidos/${nroPed}/platos`).pipe(
    switchMap(ResponsePlatoEst => {
      const plato = ResponsePlatoEst.data.find(p => p.plato.numPlato === numPlato); // Buscar el plato específico
      if (plato) {
        const platoData = {
          fechaSolicitud: plato.fechaSolicitud,
          horaSolicitud: plato.horaSolicitud,
          cantidad: plato.cantidad,
          recibido: true // Marcamos el plato como recibido
        };
        return this.http.put(`http://localhost:3000/api/pedidos/${nroPed}/platos/${numPlato}`, platoData);
      } else {
        return of(null); // Si no se encuentra el plato, retornamos null
      }
    })
  );
}

marcarBebidaComoRecibida(nroPed: number, codBebida: number): Observable<any> {
  return this.http.get<{ data: BebidaPedidoEst[] }>(`http://localhost:3000/api/pedidos/${nroPed}/bebidas`).pipe(
    switchMap(ResponseBebidaEst => {
      const bebida = ResponseBebidaEst.data.find(b => b.bebida.codBebida === codBebida); // Buscar la bebida específica
      if (bebida) {
        const bebidaData = {
          fechaSolicitud: bebida.fechaSolicitud,
          horaSolicitud: bebida.horaSolicitud,
          cantidad: bebida.cantidad,
          recibido: true // Marcamos la bebida como recibida
        };
        return this.http.put(`http://localhost:3000/api/pedidos/${nroPed}/bebidas/${codBebida}`, bebidaData);
      } else {
        return of(null); // Si no se encuentra la bebida, retornamos null
      }
    })
  );
}

obtenerPlatosDelPedido(pedidoId: number): Observable<PlatoConCantidad[]> {
    return this.http.get<PlatoConCantidad[]>(`http://localhost:3000/api/pedidos/${pedidoId}/platos`);
  }
}

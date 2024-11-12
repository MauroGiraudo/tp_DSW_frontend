import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../service/pedido.service.js';
import { PlatoConCantidad, BebidaConCantidad,PlatoPedido,BebidaPedido } from '../../models/mesa.models.js';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pedido-modificar',
  templateUrl: './pedido-modificar.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./pedido-modificar.component.scss']
})
export class PedidoModificarComponent implements OnInit {

  pedidoPlatos: PlatoConCantidad[] = [];
  pedidoBebidas: BebidaConCantidad[] = [];
  mensaje: string | undefined;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const { platos, bebidas } = this.pedidoService.obtenerPedido();
    this.pedidoPlatos = platos.map(plato => ({ ...plato, cantidad: plato.cantidad || 1 }));
    this.pedidoBebidas = bebidas.map(bebida => ({ ...bebida, cantidad: bebida.cantidad || 1 }));
  }

  aumentarCantidad(plato: PlatoConCantidad): void {
    plato.cantidad = (plato.cantidad || 1) + 1;
    this.pedidoService.actualizarCantidadPlato(plato.numPlato, plato.cantidad);
  }

  reducirCantidad(plato: PlatoConCantidad): void {
    if ((plato.cantidad || 1) > 1) {
      plato.cantidad = (plato.cantidad || 1) - 1;
      this.pedidoService.actualizarCantidadPlato(plato.numPlato, plato.cantidad);
    } else {
      this.pedidoPlatos = this.pedidoPlatos.filter(p => p.numPlato !== plato.numPlato);
      this.pedidoService.actualizarCantidadPlato(plato.numPlato, 0);
    }
  }

  aumentarCantidadBebida(bebida: BebidaConCantidad): void {
    bebida.cantidad = (bebida.cantidad || 1) + 1;
    this.pedidoService.actualizarCantidadBebida(bebida.codBebida, bebida.cantidad);
  }

  reducirCantidadBebida(bebida: BebidaConCantidad): void {
    if ((bebida.cantidad || 1) > 1) {
      bebida.cantidad = (bebida.cantidad || 1) - 1;
      this.pedidoService.actualizarCantidadBebida(bebida.codBebida, bebida.cantidad);
    } else {
      this.pedidoBebidas = this.pedidoBebidas.filter(b => b.codBebida !== bebida.codBebida);
      this.pedidoService.actualizarCantidadBebida(bebida.codBebida, 0);
    }
  }

  calcularTotal(): number {
    const totalPlatos = this.pedidoPlatos.reduce((total, plato) => total + (plato.precio * (plato.cantidad || 0)), 0);
    const totalBebidas = this.pedidoBebidas.reduce((total, bebida) => total + (bebida.precio * (bebida.cantidad || 0)), 0);
    return totalPlatos + totalBebidas;
  }

  actualizarPedido(): void {
    const platos: PlatoPedido[] = this.pedidoPlatos.map(plato => ({
      numPlato: plato.numPlato,
      cantidad: plato.cantidad || 1,
    }));
    const bebidas: BebidaPedido[] = this.pedidoBebidas.map(bebida => ({
      codBebida: bebida.codBebida,
      cantidad: bebida.cantidad || 1,
    }));
    const totalImporte = this.calcularTotal();
    this.pedidoService.obtenerPedidoEnCurso().subscribe(
      (pedidoId) => {
        if (pedidoId) {
          this.pedidoService.actualizarPedidoEnCurso(pedidoId, platos, bebidas).subscribe(
            (response) => {
              console.log('Pedido actualizado con éxito', response);
              this.mensaje = 'Pedido actualizado exitosamente.';
            },
            (error) => {
              console.error('Error al actualizar el pedido en curso', error);
              this.mensaje = 'Error al actualizar el pedido. Intenta nuevamente.';
            }
          );
        } else {
          console.log('No hay un pedido en curso para actualizar');
          this.mensaje = 'No hay un pedido en curso para actualizar.';
        }
      },
      (error) => {
        console.error('Error al obtener el pedido en curso', error);
        this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
      }
    );
  }

  marcarComoRecibido(): void {
    this.pedidoService.obtenerPedidoEnCurso().subscribe(
      (pedidoId) => {
        if (pedidoId) {
          this.pedidoService.recibido(pedidoId).subscribe(
            (response) => {
              console.log('Platos y bebidas marcados como recibidos', response);
              this.mensaje = 'Platos y bebidas marcados como recibidos exitosamente.';
            },
            (error) => {
              console.error('Error al marcar platos y bebidas como recibidos', error);
              this.mensaje = 'Error al marcar los platos y bebidas como recibidos. Intenta nuevamente.';
            }
          );
        } else {
          console.log('No hay un pedido en curso para marcar como recibido');
          this.mensaje = 'No hay un pedido en curso para marcar como recibido.';
        }
      },
      (error) => {
        console.error('Error al obtener el pedido en curso', error);
        this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
      }
    );
  }

  finalizarPedido(): void {
    const platos: PlatoPedido[] = this.pedidoPlatos.map(plato => ({
      numPlato: plato.numPlato,
      cantidad: plato.cantidad || 1,
    }));
    const bebidas: BebidaPedido[] = this.pedidoBebidas.map(bebida => ({
      codBebida: bebida.codBebida,
      cantidad: bebida.cantidad || 1,
    }));
    const totalImporte = this.calcularTotal();
    this.pedidoService.obtenerPedidoEnCurso().subscribe(
      (pedidoId) => {
        if (pedidoId) {
          this.pedidoService.finalizarPedido(pedidoId, platos, bebidas, totalImporte).subscribe(
            (response) => {
              console.log('Pedido finalizado exitosamente', response);
              this.mensaje = 'Pedido finalizado exitosamente';
            },
            (error) => {
              console.error('Error al finalizar el pedido', error);
              this.mensaje = 'Error al finalizar el pedido. Intenta nuevamente.';
            }
          );
        } else {
          console.log('No hay un pedido en curso para finalizar');
          this.mensaje = 'No hay un pedido en curso para finalizar.';
        }
      },
      (error) => {
        console.error('Error al obtener el pedido en curso', error);
        this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
      }
    );
  }

  cancelarPedido(): void {
  this.pedidoService.obtenerPedidoEnCurso().subscribe(
    (pedidoId) => {
      if (pedidoId) {
        this.pedidoService.cancelarPedido(pedidoId).subscribe(
          (response) => {
            console.log('Pedido cancelado exitosamente', response);
            this.mensaje = 'Pedido cancelado exitosamente.';
          },
          (error) => {
            console.error('Error al cancelar el pedido', error);
            this.mensaje = 'Error al cancelar el pedido. Intenta nuevamente.'; 
          }
        );
      } else {
        console.log('No hay un pedido en curso para cancelar');
        this.mensaje = 'No hay un pedido en curso para cancelar.';
      }
    },
    (error) => {
      console.error('Error al obtener el pedido en curso', error);
      this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
    }
  );
}
} 
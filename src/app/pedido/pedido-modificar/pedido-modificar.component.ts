import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../service/pedido.service.js';
import { PlatoConCantidad, BebidaConCantidad,PlatoPedido,BebidaPedido } from '../../models/mesa.models.js';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pedido-modificar',
  standalone: true,
  imports: [CommonModule],
    templateUrl: './pedido-modificar.component.html',
  styleUrls: ['./pedido-modificar.component.scss']
})
export class PedidoModificarComponent implements OnInit {

  pedidoPlatos: PlatoConCantidad[] = [];
  pedidoBebidas: BebidaConCantidad[] = [];
  mensaje: string | undefined;

  constructor(private pedidoService: PedidoService) {}

ngOnInit(): void {
  // Recupera el pedido en curso desde el servicio
  this.pedidoService.obtenerPedidoEnCurso().subscribe(
    (pedidoId) => {
      if (pedidoId) {
        // Usamos el método que obtiene platos y bebidas en una sola llamada
        this.pedidoService.obtenerPlatosBebidasPorPedido(pedidoId).subscribe(
          (response) => {
            // Asigna los platos recuperados a la variable, si existen
            this.pedidoPlatos = response.platos
              ? response.platos.map(plato => ({ ...plato, cantidad: plato.cantidad || 1 }))
              : []; // Si no hay platos, asigna un arreglo vacío

            // Asigna las bebidas recuperadas a la variable, si existen
            this.pedidoBebidas = response.bebidas && Array.isArray(response.bebidas)
              ? response.bebidas.map(bebida => ({ ...bebida, cantidad: bebida.cantidad || 1 }))
              : []; // Si no hay bebidas, asigna un arreglo vacío

            // Si no se encuentran platos ni bebidas, actualiza el mensaje
            if (this.pedidoPlatos.length === 0 && this.pedidoBebidas.length === 0) {
              this.mensaje = 'No se han encontrado platos ni bebidas para el pedido en curso.';
            } else if (this.pedidoPlatos.length === 0) {
              // Si no hay platos, pero sí bebidas, actualiza el mensaje
              this.mensaje = 'No se han encontrado platos para el pedido, pero sí bebidas.';
            } else if (this.pedidoBebidas.length === 0) {
              // Si no hay bebidas, pero sí platos, actualiza el mensaje
              this.mensaje = 'No se han encontrado bebidas para el pedido, pero sí platos.';
            } else {
              // Si se encuentran tanto platos como bebidas, puedes actualizar el mensaje
              this.mensaje = ''; // Mensaje vacío si se encuentran ambos
            }
          },
          (error) => {
            console.error('Error al obtener los platos y bebidas del pedido', error);
            this.mensaje = 'Error al obtener los platos y bebidas del pedido. Intenta nuevamente.';
          }
        );
      } else {
        console.log('No hay un pedido en curso');
        this.mensaje = 'No hay un pedido en curso para mostrar.';
      }
    },
    (error) => {
      console.error('Error al obtener el pedido en curso', error);
      this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
    }
  );
}

  calcularTotal(): number {
    const totalPlatos = this.pedidoPlatos.reduce((total, plato) => total + (plato.precio * (plato.cantidad || 0)), 0);
    const totalBebidas = this.pedidoBebidas.reduce((total, bebida) => total + (bebida.precio * (bebida.cantidad || 0)), 0);
    return totalPlatos + totalBebidas;
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
  )}

 
   marcarPlatoComoRecibido(plato: PlatoConCantidad): void {
    this.pedidoService.obtenerPedidoEnCurso().subscribe(
      (nroPed) => {  // El nroPed es un número, no un objeto
        if (nroPed) {
          this.pedidoService.marcarPlatoComoRecibido(nroPed, plato.numPlato).subscribe(
            (response) => {
              console.log('Plato marcado como recibido', response);
              this.mensaje = `Plato ${plato.descripcion} marcado como recibido.`;
            },
            (error) => {
              console.error('Error al marcar el plato como recibido', error);
              this.mensaje = `Error al marcar el plato ${plato.descripcion} como recibido.`;
            }
          );
        } else {
          console.log('No hay un pedido en curso para marcar el plato como recibido');
          this.mensaje = 'No hay un pedido en curso para marcar el plato como recibido.';
        }
      },
      (error) => {
        console.error('Error al obtener el pedido en curso', error);
        this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
      }
    );
  }

  // Método para marcar la bebida como recibida
  marcarBebidaComoRecibida(bebida: BebidaConCantidad): void {
    this.pedidoService.obtenerPedidoEnCurso().subscribe(
      (nroPed) => {  // El nroPed es un número, no un objeto
        if (nroPed) {
          this.pedidoService.marcarBebidaComoRecibida(nroPed, bebida.codBebida).subscribe(
            (response) => {
              console.log('Bebida marcada como recibida', response);
              this.mensaje = `Bebida ${bebida.descripcion} marcada como recibida.`;
            },
            (error) => {
              console.error('Error al marcar la bebida como recibida', error);
              this.mensaje = `Error al marcar la bebida ${bebida.descripcion} como recibida.`;
            }
          );
        } else {
          console.log('No hay un pedido en curso para marcar la bebida como recibida');
          this.mensaje = 'No hay un pedido en curso para marcar la bebida como recibida.';
        }
      },
      (error) => {
        console.error('Error al obtener el pedido en curso', error);
        this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
      }
    );
  }
}

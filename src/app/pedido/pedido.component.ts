import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../service/pedido.service';
import { Plato } from '../models/mesa.models';
import { Bebida } from '../models/mesa.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedidoPlatos: (Plato & { cantidad?: number })[] = [];
  pedidoBebidas: (Bebida & { cantidad?: number })[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const { platos, bebidas } = this.pedidoService.obtenerPedido();
    this.pedidoPlatos = platos.map(plato => ({ ...plato, cantidad: 1 }));
    this.pedidoBebidas = bebidas.map(bebida => ({ ...bebida, cantidad: 1 }));
  }

  aumentarCantidad(plato: Plato & { cantidad?: number }): void {
    plato.cantidad = (plato.cantidad || 1) + 1;
    this.pedidoService.actualizarCantidadPlato(plato.numPlato, plato.cantidad);
  }

  reducirCantidad(plato: Plato & { cantidad?: number }): void {
    if ((plato.cantidad || 1) > 1) {
      plato.cantidad = (plato.cantidad || 1) - 1;
      this.pedidoService.actualizarCantidadPlato(plato.numPlato, plato.cantidad);
    } else {
      this.pedidoPlatos = this.pedidoPlatos.filter(p => p.numPlato !== plato.numPlato);
      this.pedidoService.actualizarCantidadPlato(plato.numPlato, 0);
    }
  }

  aumentarCantidadBebida(bebida: Bebida & { cantidad?: number }): void {
    bebida.cantidad = (bebida.cantidad || 1) + 1;
    this.pedidoService.actualizarCantidadBebida(bebida.codBebida, bebida.cantidad);
  }

  reducirCantidadBebida(bebida: Bebida & { cantidad?: number }): void {
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
}

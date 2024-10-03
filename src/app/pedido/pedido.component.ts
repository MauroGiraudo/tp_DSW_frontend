import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../service/pedido.service.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  standalone: true, 
  imports: [CommonModule],
  styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent implements OnInit {

  pedido: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedido = this.pedidoService.obtenerPedido();
  }

  aumentarCantidad(plato: any): void {
    plato.cantidad++;
    this.pedidoService.actualizarCantidadPlato(plato.num_plato, plato.cantidad);
  }

  reducirCantidad(plato: any): void {
    if (plato.cantidad > 1) {
      plato.cantidad--;
      this.pedidoService.actualizarCantidadPlato(plato.num_plato, plato.cantidad);
    }
  }

  calcularTotal(): number {
    return this.pedido.reduce((total, plato) => total + (plato.precio * plato.cantidad), 0);
  }
}

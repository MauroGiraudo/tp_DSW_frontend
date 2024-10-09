import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  private pedido: any[] = [];

  agregarPlatoAlPedido(plato: any): void {
    this.pedido.push(plato);
    console.log('Plato agregado al pedido:', plato);
  }

  obtenerPedido(): any[] {
    return this.pedido;
  }

  actualizarCantidadPlato(id: number, nuevaCantidad: number): void {
    const plato = this.pedido.find(p => p.id === id);
    if (plato) {
      plato.cantidad = nuevaCantidad;
    }
  }
}

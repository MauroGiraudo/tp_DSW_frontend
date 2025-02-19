import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidoService } from '../../service/pedido.service';  // El servicio de pedidos
import { CommonModule } from '@angular/common';
import { Pedido } from '../../models/mesa.models';
import { ResponsePedido } from '../../models/mesa.models';
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { PedidosLis } from '../../models/mesa.models';
import { ResponsePedidosLis } from '../../models/mesa.models';

@Component({
  selector: 'app-lista-pedido',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent implements OnInit, OnDestroy {

  pedidos: Pedido[] = [];
  pedidosLis: PedidosLis[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  private destroy$ = new Subject<void>();

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoService.obtenerPedidos().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (pedidosLis: PedidosLis[]) => {
        this.pedidosLis = pedidosLis;
      },
      (error) => {
        console.error("Error al obtener los pedidos:", error);
      }
    );
  }

  get filteredPedidos() {
    return this.pedidosLis.filter(pedidosLis =>
      pedidosLis.nroPed.toString().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedType === '' || pedidosLis.estado === this.selectedType)
    );

  }

  onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

  filterByStatus(type: string): void {
    this.selectedType = type;
    console.log('Estado eleccionado:', this.selectedType);
  }

  resetFilter(): void {
    this.selectedType = '';
    console.log('Filtro de estado restablecido. Mostrando todos los pedidos.');
  }

  toggleDetalles(pedidosLis: PedidosLis) {
    pedidosLis.mostrarDetalles = !pedidosLis.mostrarDetalles;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

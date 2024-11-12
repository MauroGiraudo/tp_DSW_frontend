import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { PedidoService } from '../../service/pedido.service.js';  // El servicio de pedidos
import { CommonModule } from '@angular/common';
import { Pedido } from '../../models/mesa.models.js';
import { ResponsePedido } from '../../models/mesa.models.js';
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { PedidosLis } from '../../models/mesa.models.js';
import { ResponsePedidosLis } from '../../models/mesa.models.js';

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
  private destroy$ = new Subject<void>();  

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoService.obtenerPedidos().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (pedidosLis: PedidosLis[]) => {  // Aquí cambiamos el tipo a 'PedidosLis[]'
        this.pedidosLis = pedidosLis;  // Ahora directamente asignamos los pedidos
      },
      (error) => {
        console.error("Error al obtener los pedidos:", error);
      }
    );
  }




  // Getter para pedidos filtrados
  get filteredPedidos() {
    return this.pedidosLis.filter(pedidosLis =>
      pedidosLis.nroPed.toString().includes(this.searchTerm)
    );
  }


  onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

toggleDetalles(pedidosLis: PedidosLis) {
  pedidosLis.mostrarDetalles = !pedidosLis.mostrarDetalles;
}


  ngOnDestroy(): void {
    this.destroy$.next();  
    this.destroy$.complete();  
  }
}

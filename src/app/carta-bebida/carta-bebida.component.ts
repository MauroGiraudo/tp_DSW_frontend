import { Component, OnInit } from '@angular/core';
import { BebidaService } from '../service/bebida.service.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../service/pedido.service.js';

@Component({
  selector: 'app-carta-bebida',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './carta.bebida.component.html',
  styleUrls: ['./carta.bebida.component.scss']
})
export class CartaBebidaComponent implements OnInit {
  
  bebidas: any[] = [];
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda
  selectedType: string = ''; // Tipo de bebida seleccionado

  constructor(private bebidaService: BebidaService, private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getBebidas();
  }

  getBebidas() {
    this.bebidaService.getBebidas().subscribe((response) => {
      if (response && response.data) {
        this.bebidas = response.data;
      } else {
        console.error("Estructura de datos inesperada", response);
      }
      console.log("Datos recibidos:", this.bebidas);
    });
  }

  // Getter para bebidas filtradas
  get filteredBebidas() {
    return this.bebidas.filter(bebida =>
      bebida.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedType === '' || bebida.alcohol === this.selectedType)
    );
  }

  onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

  // Método para filtrar por tipo de bebida (con o sin alcohol)
  filterByType(type: string): void {
    this.selectedType = type;
    console.log('Tipo de bebida seleccionado:', this.selectedType);
  }

  // Método para mostrar todas las bebidas sin aplicar filtro de tipo
  resetFilter(): void {
    this.selectedType = '';
    console.log('Filtro de tipo de bebida restablecido. Mostrando todas las bebidas.');
  }

  agregarAlPedido(bebida: any): void {
    const bebidaPedido = {
      cod_bebida: bebida.cod_bebida,
      descripcion: bebida.descripcion,
      precio: bebida.precio,
      cantidad: 1 // Cantidad inicial predeterminada
    };
    this.pedidoService.agregarPlatoAlPedido(bebidaPedido);
    console.log('Bebida agregada al pedido:', bebidaPedido);
  }
}

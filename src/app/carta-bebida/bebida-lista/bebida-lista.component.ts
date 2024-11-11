import { Component, OnInit } from '@angular/core';
import { BebidaService } from '../../service/bebida.service.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../service/pedido.service.js';
import { Bebida, BebidaConCantidad } from '../../models/mesa.models.js';

@Component({
  selector: 'app-lista-bebida',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './bebida-lista.component.html',
  styleUrls: ['./bebida-lista.component.scss']
})
export class BebidaListaComponent implements OnInit {
  
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

  agregarAlPedido(bebida: Bebida): void {
    const bebidaPedido: BebidaConCantidad = {
      codBebida: bebida.codBebida,
      descripcion: bebida.descripcion,
      stock:bebida.stock,
      unidadMedida: bebida.unidadMedida,
      contenido:bebida.contenido,
      precio: bebida.precio,
      alcohol:bebida.alcohol,
      imagen:bebida.imagen,
      proveedor:bebida.proveedor,
      cantidad:1,
    };
    this.pedidoService.agregarBebidaAlPedido(bebidaPedido);
    console.log('Bebida agregada al pedido:', bebidaPedido);
  }
}

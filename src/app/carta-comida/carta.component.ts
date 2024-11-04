import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../service/plato.service.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../service/pedido.service.js';


@Component({
  selector: 'app-carta-comida',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss'] // Corregido a 'styleUrls' (no 'styleUrl')
})

export class CartaComidaComponents implements OnInit {
  
  platos: any[] = [];
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda
  selectedType: string = ''; // Tipo de plato seleccionado

  constructor(private platoService: PlatoService,private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getPlatos();
  }

  getPlatos() {
    this.platoService.getPlatos().subscribe((response) => {
      if (response && response.data) {
        this.platos = response.data;
      } else {
        console.error("Estructura de datos inesperada", response);
      }
      console.log("Datos recibidos:", this.platos);
    });
  }

  get filteredPlatos() {
    return this.platos.filter(plato =>
      plato.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedType === '' || plato.tipoPlato.descTPlato === this.selectedType)
    );}

  onSearch(): void {
  // Comportamiento del botón de búsqueda
  console.log('Término de búsqueda:', this.searchTerm);}

  // Método para seleccionar un tipo de plato y aplicar el filtro
  filterByType(type: string): void {
    this.selectedType = type;
    console.log('Tipo de plato seleccionado:', this.selectedType);
  }

  // Método para restablecer el filtro de tipo de plato y mostrar todos los platos
  resetFilter(): void {
    this.selectedType = ''; // Restablece el tipo de plato seleccionado
    console.log('Filtro de tipo de plato restablecido. Mostrando todos los platos.');
  }

  agregarAlPedido(plato: any): void {
  const platoPedido = {
    num_plato: plato.num_plato,
    descripcion: plato.descripcion,
    precio: plato.precio,
    cantidad: 1 // Cantidad inicial predeterminada
  };

  this.pedidoService.agregarPlatoAlPedido(platoPedido);
  console.log('Plato agregado al pedido:', platoPedido); // Agregar plato al array del pedido
}
}
import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../../service/plato.service.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../service/pedido.service.js';
import { Plato } from '../../models/mesa.models.js';
import { PlatoConCantidad } from '../../models/mesa.models.js';


@Component({
  selector: 'app-plato-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './plato-lista.component.html',
  styleUrls: ['./plato-lista.component.scss'] 
})

export class PlatoListaComponent implements OnInit {
  platos: any[] = [];
  searchTerm: string = ''; 
  selectedType: string = ''; 

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
  console.log('Término de búsqueda:', this.searchTerm);}
  
  filterByType(type: string): void {
    this.selectedType = type;
    console.log('Tipo de plato seleccionado:', this.selectedType);
  }

  resetFilter(): void {
    this.selectedType = '';
    console.log('Filtro de tipo de plato restablecido. Mostrando todos los platos.');
  }

  agregarAlPedido(plato: Plato): void {
  const platoPedido: PlatoConCantidad = {
    numPlato: plato.numPlato,
    descripcion: plato.descripcion,
    tiempo: plato.tiempo,
    precio: plato.precio,
    aptoCeliaco: plato.aptoCeliaco,
    aptoVegetarianos: plato.aptoVegetarianos,
    aptoVeganos: plato.aptoVeganos,
    imagen: plato.imagen,
    cantidad: 1,
  };

  this.pedidoService.agregarPlatoAlPedido(platoPedido);
  console.log('Plato agregado al pedido:', platoPedido);
}
}

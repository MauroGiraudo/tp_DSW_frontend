import { Component, OnInit } from '@angular/core';
import { BebidaService } from '../../service/bebida.service.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../service/pedido.service.js';
import { Bebida, BebidaConCantidad } from '../../models/mesa.models.js';
import { UsuarioService } from '../../service/usuario.service.js'; 

@Component({
  selector: 'app-lista-bebida',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './bebida-lista.component.html',
  styleUrls: ['./bebida-lista.component.scss']
})
export class BebidaListaComponent implements OnInit {

  bebidas: any[] = [];
  searchTerm: string = ''; 
  selectedType: string = '';
  tipoUsuario: string = '';
  mensaje: string = ''; 

  constructor(
    private bebidaService: BebidaService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getBebidas();
    this.tipoUsuario = this.usuarioService.showTipoUsuario() || '';
  }

  toggleFlip(bebida: any) {
  bebida.flipped = !bebida.flipped;
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
  get filteredBebidas() {
    return this.bebidas.filter(bebida =>
      bebida.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedType === '' || bebida.alcohol === this.selectedType)
    );
  }

  onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }


  filterByType(type: string): void {
    this.selectedType = type;
    console.log('Tipo de bebida seleccionado:', this.selectedType);
  }

  resetFilter(): void {
    this.selectedType = '';
    console.log('Filtro de tipo de bebida restablecido. Mostrando todas las bebidas.');
  }

  agregarAlPedido(bebida: Bebida): void {
  const bebidaPedido: BebidaConCantidad = {
    codBebida: bebida.codBebida,
    descripcion: bebida.descripcion,
    stock: bebida.stock,
    unidadMedida: bebida.unidadMedida,
    contenido: bebida.contenido,
    precio: bebida.precio,
    alcohol: bebida.alcohol,
    imagen: bebida.imagen,
    proveedor: bebida.proveedor,
    cantidad: 1,
  };

  this.pedidoService.obtenerPedidoEnCurso().subscribe(
    (pedidoId) => {
      if (pedidoId) {
        this.pedidoService.actualizarPedidoEnCurso(pedidoId, [], [bebidaPedido]).subscribe(
          (response) => {
            console.log('Pedido actualizado con la bebida agregada con éxito', response);
            this.mensaje = 'Bebida agregada exitosamente al pedido.';
          },
          (error) => {
            console.error('Error al actualizar el pedido en curso con la bebida', error);
            this.mensaje = 'Error al actualizar el pedido. Intenta nuevamente.';
          }
        );
      } else {
        console.log('No hay un pedido en curso para actualizar');
        this.mensaje = 'No hay un pedido en curso para agregar la bebida.';
      }
    },
    (error) => {
      console.error('Error al obtener el pedido en curso', error);
      this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
    }
  );
}
}

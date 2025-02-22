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
  mensaje: string = '';  

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
    this.actualizarPedido(plato);
    console.log('Plato agregado al pedido:', plato);
  }

actualizarPedido(plato: Plato): void {
  this.pedidoService.obtenerPedidoEnCurso().subscribe(
    (pedidoId) => {
      if (!pedidoId) {
        console.log('No hay un pedido en curso para actualizar');
        this.mensaje = 'No hay un pedido en curso para agregar el plato.';
        return;
      }

      this.pedidoService.obtenerPlatosDelPedido(pedidoId).subscribe(
        (platosExistentes: any[] | null) => {
          console.log('Platos existentes en el pedido:', platosExistentes);
          const platos = Array.isArray(platosExistentes) ? platosExistentes : [];
          const platoExistente = platos.find(p => p.plato.numPlato === plato.numPlato);

          if (platoExistente) {
            console.log(`El plato con numPlato ${plato.numPlato} ya existe en el pedido. Cantidad actual: ${platoExistente.cantidad}`);
            platoExistente.cantidad += 1;
          } else {
            console.log(`El plato con numPlato ${plato.numPlato} no está en el pedido, lo agregamos con cantidad 1`);
            platos.push({ plato: { numPlato: plato.numPlato }, cantidad: 1 });
          }

          const platosActualizados = platos.map(p => ({
            numPlato: p.plato.numPlato,
            cantidad: p.cantidad
          }));

          console.log('Platos después de actualización:', platosActualizados);

          this.pedidoService.actualizarPedidoEnCurso(pedidoId, platosActualizados, []).subscribe(
            () => {
              console.log('Pedido actualizado con el plato agregado con éxito');
              this.mensaje = 'Plato agregado exitosamente al pedido.';
            },
            (error) => {
              console.error('Error al actualizar el pedido en curso con el plato', error);
              this.mensaje = 'Error al actualizar el pedido. Intenta nuevamente.';
            }
          );
        },
        (error) => {
          console.error('Error al obtener los platos del pedido', error);
          this.mensaje = 'Error al obtener los platos del pedido. Intenta nuevamente.';
        }
      );
    },
    (error) => {
      console.error('Error al obtener el pedido en curso', error);
      this.mensaje = 'Error al obtener el pedido en curso. Intenta nuevamente.';
    }
  );
}
}

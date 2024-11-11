import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../service/pedido.service';
import { MesaService } from '../../service/mesa.service';
import { PlatoConCantidad, BebidaConCantidad } from '../../models/mesa.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido-crear',
  templateUrl: './pedido-crear.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./pedido-crear.component.scss']
})
export class PedidoCrearComponent implements OnInit {

  pedidoPlatos: PlatoConCantidad[] = [];
  pedidoBebidas: BebidaConCantidad[] = [];
  mensaje: string | undefined;
  nro_mesa: number | undefined;  // Número de mesa
  clienteId: number = 1;  // ID del cliente logueado
  pedidoEnCurso: boolean = false; // Indica si ya se ha creado el pedido
  nroPed: number | undefined; // Número de pedido actual

  constructor(
    private pedidoService: PedidoService,
    private mesaService: MesaService
  ) {}

  ngOnInit(): void {
    // Obtener el estado del pedido al cargar el componente
    const pedidoActual = this.pedidoService.obtenerPedido();
    this.pedidoPlatos = pedidoActual.platos;
    this.pedidoBebidas = pedidoActual.bebidas;
  }

  // Crear un nuevo pedido con número de mesa y cliente
  async crearPedido(): Promise<void> {
  if (!this.nro_mesa) {
    this.mensaje = 'Por favor ingresa el número de mesa.';
    return;
  }

  const mesaEsValida = await this.verificarMesaExistente();
  if (!mesaEsValida) {
    this.mensaje = 'La mesa ingresada no existe o no está disponible.';
    return;
  }

  const pedidoData = {
    mesa: this.nro_mesa,
  };

  this.pedidoService.crearPedido(pedidoData).subscribe({
    next: (response) => {
      console.log('Pedido creado', response);
      this.mensaje = 'Pedido creado exitosamente.';
      this.pedidoEnCurso = true;
      this.nroPed = response.nroPed; // Asigna el nroPed del pedido creado
      // Aquí debes actualizar los platos y bebidas después de crear el pedido
      this.pedidoService.obtenerPedido();
    },
    error: (error) => {
      console.error('Error al crear el pedido', error);
      this.mensaje = 'Hubo un problema al crear el pedido. Intenta de nuevo.';
    }
  });
}


  aumentarCantidad(plato: PlatoConCantidad): void {
    plato.cantidad = (plato.cantidad || 1) + 1;
    this.pedidoService.actualizarCantidadPlato(plato.numPlato, plato.cantidad);
    // Actualizamos el pedido en la UI después de aumentar la cantidad
    const pedidoActual = this.pedidoService.obtenerPedido();
    this.pedidoPlatos = pedidoActual.platos;
  }

  reducirCantidad(plato: PlatoConCantidad): void {
    if ((plato.cantidad || 1) > 1) {
      plato.cantidad = (plato.cantidad || 1) - 1;
      this.pedidoService.actualizarCantidadPlato(plato.numPlato, plato.cantidad);
    } else {
      this.pedidoPlatos = this.pedidoPlatos.filter(p => p.numPlato !== plato.numPlato);
      this.pedidoService.actualizarCantidadPlato(plato.numPlato, 0);
    }
    // Actualizamos el pedido en la UI después de reducir la cantidad
    const pedidoActual = this.pedidoService.obtenerPedido();
    this.pedidoPlatos = pedidoActual.platos;
  }

  aumentarCantidadBebida(bebida: BebidaConCantidad): void {
    bebida.cantidad = (bebida.cantidad || 1) + 1;
    this.pedidoService.actualizarCantidadBebida(bebida.codBebida, bebida.cantidad);
    // Actualizamos el pedido en la UI después de aumentar la cantidad
    const pedidoActual = this.pedidoService.obtenerPedido();
    this.pedidoBebidas = pedidoActual.bebidas;
  }

  reducirCantidadBebida(bebida: BebidaConCantidad): void {
    if ((bebida.cantidad || 1) > 1) {
      bebida.cantidad = (bebida.cantidad || 1) - 1;
      this.pedidoService.actualizarCantidadBebida(bebida.codBebida, bebida.cantidad);
    } else {
      this.pedidoBebidas = this.pedidoBebidas.filter(b => b.codBebida !== bebida.codBebida);
      this.pedidoService.actualizarCantidadBebida(bebida.codBebida, 0);
    }
    // Actualizamos el pedido en la UI después de reducir la cantidad
    const pedidoActual = this.pedidoService.obtenerPedido();
    this.pedidoBebidas = pedidoActual.bebidas;
  }

  calcularTotal(): number {
    const totalPlatos = this.pedidoPlatos.reduce((total, plato) => total + (plato.precio * (plato.cantidad || 0)), 0);
    const totalBebidas = this.pedidoBebidas.reduce((total, bebida) => total + (bebida.precio * (bebida.cantidad || 0)), 0);
    return totalPlatos + totalBebidas;
  }

  async verificarMesaExistente(): Promise<boolean> {
    console.log('Verificando mesa con nro_mesa:', this.nro_mesa); // Verifica que nro_mesa esté correcto
    if (this.nro_mesa) {
      try {
        const mesaDisponible = await this.mesaService.verificarMesaDisponible(this.nro_mesa).toPromise();
        console.log('Mesa disponible:', mesaDisponible);  // Verifica el estado de la mesa
        return mesaDisponible ?? false;  // Si mesaDisponible es undefined, retornamos false
      } catch (error) {
        console.error('Error al verificar la mesa:', error);
        return false;  // Si hay un error, devolvemos `false`
      }
    }
    return false;  // Si no hay número de mesa, devolvemos `false`
  }
}


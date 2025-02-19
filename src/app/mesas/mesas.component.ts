import { Component, OnInit, OnDestroy } from '@angular/core';
import { MesaService } from '../service/mesa.service';
import { CommonModule } from '@angular/common';
import { ResponseMesas } from '../models/mesa.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit, OnDestroy {

  mesas: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private mesaService: MesaService) {}

  ngOnInit(): void {
    this.getMesas();
  }

  getMesas() {
    this.mesaService.getMesas().pipe(takeUntil(this.destroy$)).subscribe(
      (response: ResponseMesas) => {
        if (response.data && Array.isArray(response.data)) {
          this.mesas = response.data;
        } else {
          console.error("La respuesta no es un array", response);
        }
      },
      (error) => {
        console.error("Error al obtener las mesas:", error);
        // Manejo del error aquí
      }
    );
  }

  cambiarEstadoMesa(mesa: any) {
    const nuevoEstado = mesa.estado === 'Ocupada' ? 'Disponible' : 'Ocupada';
    mesa.cargando = true; // Estado para indicar que la solicitud está en progreso

    this.mesaService.actualizarEstadoMesa(mesa.nroMesa, nuevoEstado).subscribe(
      (response) => {
        mesa.estado = nuevoEstado; // Actualiza el estado solo si la respuesta es exitosa
        console.log(`Mesa ${mesa.nroMesa} estado cambiado a: ${mesa.estado}`);
        mesa.cargando = false; // Termina el estado de carga
      },
      (error) => {
        console.error(`Error al actualizar el estado de la mesa ${mesa.nroMesa}:`, error);
        mesa.cargando = false; // Termina el estado de carga en caso de error
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

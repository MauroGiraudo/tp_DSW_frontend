import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { MesaService } from '../service/mesa.service.js';
import { CommonModule } from '@angular/common';
import { ResponseMesas } from '../models/mesa.models.js';
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
      }
    );
  }

  cambiarEstadoMesa(mesa: any) {
    const nuevoEstado = mesa.estado === 'Ocupada' ? 'Disponible' : 'Ocupada';
    mesa.cargando = true;

    this.mesaService.actualizarEstadoMesa(mesa.nroMesa, nuevoEstado).subscribe(
      (response) => {
        mesa.estado = nuevoEstado;
        console.log(`Mesa ${mesa.nroMesa} estado cambiado a: ${mesa.estado}`);
        mesa.cargando = false;
      },
      (error) => {
        console.error(`Error al actualizar el estado de la mesa ${mesa.nroMesa}:`, error);
        mesa.cargando = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

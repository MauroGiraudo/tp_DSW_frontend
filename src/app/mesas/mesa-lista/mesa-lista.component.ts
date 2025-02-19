import { Component, OnInit, OnDestroy } from '@angular/core';
import { MesaService } from '../../service/mesa.service';
import { CommonModule } from '@angular/common';
import { ResponseMesas } from '../../models/mesa.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-mesa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesa-lista.component.html',
  styleUrls: ['./mesa-lista.component.scss']
})
export class MesaListaComponent implements OnInit, OnDestroy {

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


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

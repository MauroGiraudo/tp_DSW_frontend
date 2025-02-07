import { Component, OnInit, OnDestroy } from '@angular/core';
import { TipoTarjetaService } from '../../service/tipo-tarjeta.service.js';
import { CommonModule } from '@angular/common';
import { Tipotarjeta } from '../../models/mesa.models.js';
import { ResponseTipotarjeta } from '../../models/mesa.models.js';
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tarjeta-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tarjeta-lista.component.html',
  styleUrl: './tarjeta-lista.component.scss'
})
export class TarjetaListaComponent implements OnInit, OnDestroy {
  tipotarjeta: Tipotarjeta[] = [];
  searchTerm: string = '';  
  private destroy$ = new Subject<void>();  

  constructor(private tipoTarjetaService: TipoTarjetaService) {}

  ngOnInit(): void {
    this.getTipoTarjetas();
  }

  getTipoTarjetas() {
    this.tipoTarjetaService.getTipoTarjetas().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response: ResponseTipotarjeta) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.tipotarjeta = response.data; 
        } else {
          console.error("La respuesta no contiene 'data' o no es un array", response);
        }
      },
      (error) => {
        console.error("Error al obtener los tipos de platos:", error);
      }
    );
  }

  get filteredTiposTarjeta() {
    return this.tipotarjeta.filter(tipo =>
      tipo.descTarjeta.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

  toggleDetalles(tipoTarjeta: any): void {
    tipoTarjeta.mostrarDetalles = !tipoTarjeta.mostrarDetalles;
  }

  ngOnDestroy(): void {
    this.destroy$.next();  
    this.destroy$.complete();  
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TipoplatoService } from '../../service/tipoplato.service.js';
import { CommonModule } from '@angular/common';
import { Tipoplato } from '../../models/mesa.models.js';
import { ResponseTipoplato } from '../../models/mesa.models.js';
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-tipoplato',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tipoplato-lista.component.html',
  styleUrls: ['./tipoplato-lista.component.scss']
})
export class TipoplatoListaComponent implements OnInit, OnDestroy {
  
  tipoplato: Tipoplato[] = [];
  searchTerm: string = '';  
  private destroy$ = new Subject<void>();  

  constructor(private tipoPlatoService: TipoplatoService) {}

  ngOnInit(): void {
    this.getTipoPlatos();
  }

  getTipoPlatos() {
    this.tipoPlatoService.getTipoPlatos().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response: ResponseTipoplato) => {
        // Verifica que 'data' exista y sea un array
        if (response && response.data && Array.isArray(response.data)) {
          this.tipoplato = response.data;  // Extrae los tipos de platos del campo 'data'
        } else {
          console.error("La respuesta no contiene 'data' o no es un array", response);
        }
      },
      (error) => {
        console.error("Error al obtener los tipos de platos:", error);
      }
    );
  }

  // Getter para tipos de platos filtrados
  get filteredTiposPlato() {
    return this.tipoplato.filter(tipo =>
      tipo.descTPlato.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

  toggleDetalles(tipoPlato: any): void {
    tipoPlato.mostrarDetalles = !tipoPlato.mostrarDetalles;
  }

  ngOnDestroy(): void {
    this.destroy$.next();  
    this.destroy$.complete();  
  }
}

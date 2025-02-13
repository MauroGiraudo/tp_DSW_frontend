import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResenaService } from '../../service/resena.service.js';
import { Resena } from '../../models/mesa.models.js';

@Component({
  selector: 'app-resena-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './resena-lista.component.html',
  styleUrls: ['./resena-lista.component.scss']
})
export class ResenaListaComponent implements OnInit, OnDestroy {
  resenas: Resena[] = [];
  searchTerm: string = '';
  selectedPuntaje: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(private resenaService: ResenaService) {}

  ngOnInit(): void {
    this.getResenas();
  }

  getResenas() {
    this.resenaService.obtenerResenas().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        this.resenas = response.data;
      },
      (error) => console.error('Error al obtener las reseñas:', error)
    );
  }

  get filteredResenas() {
    // Filtramos tanto por el término de búsqueda como por el puntaje seleccionado
    return this.resenas.filter(resena =>
      resena.cuerpo.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedPuntaje === null || resena.puntaje === this.selectedPuntaje)
    );
  }

  filterByPuntaje(puntaje: number): void {
    this.selectedPuntaje = puntaje;
  }

  resetFilter(): void {
    this.selectedPuntaje = null;
    this.searchTerm = '';  // Restablecer el término de búsqueda
    console.log('Filtro de puntaje restablecido. Mostrando todas las reseñas.');
  }

  onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}



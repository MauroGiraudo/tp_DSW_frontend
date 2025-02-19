import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, forkJoin, of } from 'rxjs';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import { ElaboracionplatoService } from '../../service/elaboracionplato.service';
import { PlatoService } from '../../service/plato.service';

@Component({
  selector: 'app-elaboracion-plato-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './elaboracion-plato-lista.component.html',
  styleUrls: ['./elaboracion-plato-lista.component.scss']
})
export class ElaboracionPlatoListaComponent implements OnInit, OnDestroy {
  platos: any[] = [];
  searchTerm: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private elaboracionPlatoService: ElaboracionplatoService,
    private platoService: PlatoService
  ) {}

  ngOnInit(): void {
    this.getElaboracionPlatos();
  }

 getElaboracionPlatos() {
  this.platoService.getPlatos().pipe(
    takeUntil(this.destroy$),
    switchMap(response => {
      if (!response?.data || !Array.isArray(response.data)) {
        console.error("La respuesta de platos no es válida", response);
        return of([]);
      }
      return forkJoin(response.data.map(plato =>
        this.elaboracionPlatoService.getElaboraciones(plato.numPlato).pipe(
          catchError(error => {
            console.error("Error al obtener los ingredientes del plato", plato.numPlato, error);
            return of([]); // Devuelve un array vacío en caso de error
          }),
          switchMap(ingredientes => of({ ...plato, ingredientes } as any)) // Asegura la estructura correcta
        )
      ));
    })
  ).subscribe(
    (platosConIngredientes: any[]) => { // Usa 'any' para evitar errores de tipo
      this.platos = platosConIngredientes.map(plato => ({
        ...plato,
        mostrarDetalles: false
      }));
    },
    (error) => {
      console.error("Error al obtener la elaboración de platos:", error);
    }
  );
}


  onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

  get filteredPlatos() {
    return this.platos.filter(plato =>
      plato.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleDetalles(plato: any): void {
    plato.mostrarDetalles = !plato.mostrarDetalles;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}




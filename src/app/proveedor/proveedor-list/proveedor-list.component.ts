import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { ProveedorService } from '../../service/proveedor.service.js';  
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../models/mesa.models.js'; 
import { ResponseProveedores } from '../../models/mesa.models.js';  
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-proveedor',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule],
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.scss']
})
export class ProveedorListComponent implements OnInit, OnDestroy {
  
  proveedores: Proveedor[] = [];
  searchTerm: string = '';  
  private destroy$ = new Subject<void>();  

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores() {
    this.proveedorService.getProveedores().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response: ResponseProveedores) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.proveedores = response.data; 
        } else {
          console.error("La respuesta no contiene 'data' o no es un array", response);
        }
      },
      (error) => {
        console.error("Error al obtener los proveedores:", error);
      }
    );
  }

  get filteredProveedores() {
    return this.proveedores.filter(proveedor =>
      proveedor.razonSocial.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

    onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

    toggleDetalles(proveedor: any): void {
    proveedor.mostrarDetalles = !proveedor.mostrarDetalles;
  }

  ngOnDestroy(): void {
    this.destroy$.next();  
    this.destroy$.complete();  
  }
}


import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { ProveedorService } from '../../service/proveedor.service.js';  // El servicio de proveedores
import { CommonModule } from '@angular/common';
import { Proveedor } from '../../models/mesa.models.js';  // Asegúrate de que Proveedor esté correctamente importado
import { ResponseProveedores } from '../../models/mesa.models.js';  // La respuesta de proveedores
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
        // Verifica que 'data' exista y sea un array
        if (response && response.data && Array.isArray(response.data)) {
          this.proveedores = response.data;  // Extrae los proveedores del campo 'data'
        } else {
          console.error("La respuesta no contiene 'data' o no es un array", response);
        }
      },
      (error) => {
        console.error("Error al obtener los proveedores:", error);
      }
    );
  }

  // Getter para proveedores filtrados
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


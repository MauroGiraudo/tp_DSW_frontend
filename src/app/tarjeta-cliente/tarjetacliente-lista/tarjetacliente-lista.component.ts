import { Component, OnInit, OnDestroy } from '@angular/core';
import { TarjetaService } from '../../service/tarjeta.service';
import { UsuarioService } from '../../service/usuario.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tarjetacliente-lista',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule],
  templateUrl: './tarjetacliente-lista.component.html',
  styleUrls: ['./tarjetacliente-lista.component.scss']
})
export class TarjetaclienteListaComponent implements OnInit, OnDestroy {

  tarjetas: any[] = [];
  private destroy$ = new Subject<void>();
  searchTerm: string = ''; 
  constructor(
    private tarjetaService: TarjetaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerTarjetasCliente();
  }

  obtenerTarjetasCliente() {
    this.tarjetaService.obtenerTarjetaCliente().pipe(takeUntil(this.destroy$)).subscribe(
      (response) => {
        if (response.data && Array.isArray(response.data)) {
          this.tarjetas = response.data;
        } else {
          console.error("La respuesta no es un array", response);
        }
      },
      (error) => {
        console.error("Error al obtener las tarjetas del cliente:", error);
      }
    );
  }

    onSearch(): void {
    console.log('Término de búsqueda:', this.searchTerm);
  }

  

    toggleDetalles(tarjeta: any): void {
    tarjeta.mostrarDetalles = !tarjeta.mostrarDetalles;
  }
  get filteredTarjetas() {
    return this.tarjetas.filter(tarjeta =>
      tarjeta.titular.toLowerCase().includes(this.searchTerm.toLowerCase())
    );}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TarjetaService } from '../../service/tarjeta.service';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-tarjetacliente-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './tarjetacliente-modificar.component.html',
  styleUrls: ['./tarjetacliente-modificar.component.scss']
})
export class TarjetaclienteModificarComponent implements OnInit {
  tarjetaClienteForm: FormGroup;
  mensaje: string | null = null;
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private tarjetaService: TarjetaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tarjetaClienteForm = this.fb.group({
      idTarjeta:['', [Validators.required, Validators.min(1)]],
      nroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]],
      tipoTarjeta: ['', [Validators.required]],
      bancoTarjeta: ['', [Validators.required]],
      titular: ['', [Validators.required]],
      vencimiento: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      codSeguridad: ['', [Validators.required, Validators.min(100), Validators.max(999)]],
      tarjeta: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //this.tarjetaId = +params['tarjetaId'];
      //this.cargarTarjeta();
    });
  }

  get fc() {
    return this.tarjetaClienteForm.controls;
  }

  /*cargarTarjeta(): void {
    this.tarjetaService.obtenerTarjetaCliente(this.clienteId, this.tarjetaId).subscribe(
      (tarjeta) => {
        this.tarjetaClienteForm.patchValue(tarjeta);
      },
      (error) => {
        console.error('Error al cargar la tarjeta:', error);
        this.mensaje = 'Error al cargar los datos de la tarjeta.';
      }
    );
  }*/

  modificarTarjeta(): void {
    if (this.tarjetaClienteForm.valid) {
      const tarjetaModificada = this.tarjetaClienteForm.value;
      tarjetaModificada.codSeguridad = Number(tarjetaModificada.codSeguridad);
      tarjetaModificada.idTarjeta = Number(tarjetaModificada.idTarjeta);

      this.tarjetaService.modificarTarjetaCliente(tarjetaModificada.idTarjeta, tarjetaModificada).subscribe({
        next: () => {
          this.mensaje = 'Tarjeta modificada con éxito';
          this.router.navigate(['tarjeta/lista']);
        },
        error: (error) => {
          console.error('Error al modificar la tarjeta:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al modificar la tarjeta: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }
    enviar() {
    this.enviado = true; 
    this.modificarTarjeta(); 
  }
}


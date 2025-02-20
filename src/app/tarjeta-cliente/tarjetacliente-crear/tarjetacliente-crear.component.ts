import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TarjetaService } from '../../service/tarjeta.service';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-tarjetacliente-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './tarjetacliente-crear.component.html',
  styleUrls: ['./tarjetacliente-crear.component.scss']
})
export class TarjetaclienteCrearComponent implements OnInit {
  tarjetaClienteForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private tarjetaService: TarjetaService,
    private router: Router
  ) {
    this.tarjetaClienteForm = this.fb.group({
      nroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]], 
      tipoTarjeta: ['', [Validators.required]],
      bancoTarjeta: ['', [Validators.required]],
      titular: ['', [Validators.required]],
      vencimiento: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]], 
      codSeguridad: ['', [Validators.required, Validators.min(100), Validators.max(999)]],
      tarjeta: ['', [Validators.required, Validators.min(1)]] // Campo tarjeta agregado
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.tarjetaClienteForm.controls; 
  }

  crearTarjeta() {
    if (this.tarjetaClienteForm.valid) {
      const nuevaTarjeta = this.tarjetaClienteForm.value;

      // Convertir codSeguridad a número explícitamente
      nuevaTarjeta.codSeguridad = Number(nuevaTarjeta.codSeguridad);

      this.tarjetaService.crearTarjetaCliente(nuevaTarjeta).subscribe({
        next: () => { 
          this.tarjetaClienteForm.reset();
          this.enviado = false; 
          this.mensaje = 'Tarjeta registrada con éxito'; 
          this.router.navigate(['tarjetaCliente/Lista']); 
        },
        error: (error) => {
          console.error('Error al registrar la tarjeta:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al registrar la tarjeta: ${errorMsg}`; 
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.crearTarjeta(); 
  }
}

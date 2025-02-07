import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TipoTarjetaService } from '../../service/tipo-tarjeta.service.js';
import { Tipotarjeta } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-tarjeta-eliminar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './tarjeta-eliminar.component.html',
  styleUrl: './tarjeta-eliminar.component.scss'
})
export class TarjetaEliminarComponent implements OnInit{
  tipoTarjetaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tipoTarjetaService: TipoTarjetaService,
    private router: Router 
  ) {
    this.tipoTarjetaForm = this.fb.group({
      idTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.tipoTarjetaForm.controls; 
  }

  eliminarTipoTarjeta() {
    if (this.tipoTarjetaForm.valid) {
      const idTarjeta = this.tipoTarjetaForm.value.idTarjeta;
      const descTarjeta = this.tipoTarjetaForm.value.descTarjeta;
      if (isNaN(Number(idTarjeta))) {
        this.mensaje = 'Número de plato inválido. Debe ser un número positivo.';
        return;
      }
      this.tipoTarjetaService.eliminarTipoTarjeta(idTarjeta).subscribe({
        next: () => {
          this.tipoTarjetaForm.reset();
          this.enviado = false;
          this.mensaje = 'Tipo de tarjeta eliminado exitosamente';
          this.router.navigate(['tarjeta/Lista']); 
        },
        error: (error) => {
          console.error('Error al eliminar el tipo de tarjeta:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al eliminar el tipo de tarjeta: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.eliminarTipoTarjeta();
  }
}

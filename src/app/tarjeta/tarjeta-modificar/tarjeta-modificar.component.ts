import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TipoTarjetaService } from '../../service/tipo-tarjeta.service.js';
import { Tipotarjeta } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-tarjeta-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './tarjeta-modificar.component.html',
  styleUrl: './tarjeta-modificar.component.scss'
})
export class TarjetaModificarComponent implements OnInit{
  tipoTarjetaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;
  tipoTarjetaActual: Tipotarjeta | null = null;

  constructor(
    private fb: FormBuilder,
    private tipoTarjetaService: TipoTarjetaService,
    private router: Router
  ) {
    this.tipoTarjetaForm = this.fb.group({
      idTarjeta:['', [Validators.required]],
      descTarjeta: ['', [this.whitespaceValidator()]]
    });
  }

  whitespaceValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value.trim() === '') {
          return null;
        }
        return null; 
      };
    }

  ngOnInit(): void {
    const idTarjeta = this.router.getCurrentNavigation()?.extras.state?.['idTarjeta'];
    if (idTarjeta) {
      this.obtenerTipoTarjeta(idTarjeta);
    }
  }

  get fc() {
    return this.tipoTarjetaForm.controls; 
  }

  obtenerTipoTarjeta(idTarjeta: number) {
    this.tipoTarjetaService.obtenerTipoTarjeta(idTarjeta).subscribe({
      next: (tipoTarjeta: Tipotarjeta) => {
        this.tipoTarjetaActual = tipoTarjeta;
        this.tipoTarjetaForm.patchValue({
          idTarjeta: tipoTarjeta.idTarjeta,
          descTarjeta: tipoTarjeta.descTarjeta,
          
        });
      },
      error: (error) => {
        console.error('Error al obtener el tipo de plato:', error);
        this.mensaje = 'Error al cargar los datos del tipo de plato';
      }
    });
  }

  actualizarTipoTarjeta() {
    if (this.tipoTarjetaForm.valid) {
      const idTarjeta = this.tipoTarjetaForm.value.idTarjeta;
      if (isNaN(Number(idTarjeta))) {
        this.mensaje = 'ID inválido. Debe ser un número.';
        return;
      }
      const tipotarjetaActualizado: Partial<Tipotarjeta> = {
        descTarjeta: this.tipoTarjetaForm.value.descTarjeta || this.tipoTarjetaActual?.descTarjeta,
        idTarjeta: this.tipoTarjetaForm.value.idTarjeta ? parseInt(this.tipoTarjetaForm.value.idTarjeta, 10) : this.tipoTarjetaActual?.idTarjeta,
      };

      this.tipoTarjetaService.actualizarTipoTarjeta(idTarjeta, tipotarjetaActualizado).subscribe({
        next: (response: Tipotarjeta) => {
          console.log('Tipo de tarjeta actualizado:', response);
          this.tipoTarjetaForm.reset();
          this.enviado = false;
          this.mensaje = 'Tipo de tarjeta actualizado exitosamente';
          this.router.navigate(['tarjeta/Lista'])
        },
        error: (error) => {
          console.error('Error al actualizar el tipo de tarjeta:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al actualizar el tipo de tarjeta: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.actualizarTipoTarjeta();
  }

}

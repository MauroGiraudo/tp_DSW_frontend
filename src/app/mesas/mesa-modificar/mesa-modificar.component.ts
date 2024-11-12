import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MesaService } from '../../service/mesa.service.js';
import { Mesa } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-modificar-mesa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './mesa-modificar.component.html',
  styleUrls: ['./mesa-modificar.component.scss']
})
export class MesaModificarComponent implements OnInit {
  mesaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;
  mesaActual: Mesa | null = null;

  constructor(
    private fb: FormBuilder, 
    private mesaService: MesaService,
    private router: Router
  ) {
    this.mesaForm = this.fb.group({
      nro_mesa: ['', [Validators.required]], 
      cant_personas_max: ['', [this.numberOrWhitespaceValidator()]], 
      estado: ['', [this.whitespaceValidator()]]
    });
  }

  ngOnInit(): void {
    const nro_mesa = this.router.getCurrentNavigation()?.extras.state?.['nro_mesa'];
    if (nro_mesa) {
      this.obtenerMesa(nro_mesa);
    }
  }

  get fc() {
    return this.mesaForm.controls; 
  }

  numberOrWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value === '' || value.trim() === '') {
        return null;
      }
      const valid = !isNaN(value) && value > 0; 
      return valid ? null : { 'invalidNumber': { value } };
    };
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

  obtenerMesa(nro_mesa: number) {
    this.mesaService.obtenerMesa(nro_mesa).subscribe({
      next: (mesa: Mesa) => {
        this.mesaActual = mesa;
        this.mesaForm.patchValue({
          nro_mesa: mesa.nro_mesa,
          cant_personas_max: mesa.cant_personas_max,
          estado: mesa.estado
        });
      },
      error: (error) => {
        console.error('Error al obtener la mesa:', error);
        this.mensaje = 'Error al cargar los datos de la mesa';
      }
    });
  }

  actualizarMesa() {
  if (this.mesaForm.valid) {
    const nroMesa = Number(this.mesaForm.value.nro_mesa);

    if (isNaN(nroMesa)) {
      this.mensaje = 'Número de mesa inválido. Debe ser un número.';
      return; 
    }
    const mesaActualizada: Partial<Mesa> = {
      nro_mesa: nroMesa, 
      cant_personas_max: this.mesaForm.value.cant_personas_max ? parseInt(this.mesaForm.value.cant_personas_max, 10) : this.mesaActual?.cant_personas_max,
      estado: this.mesaForm.value.estado ? this.mesaForm.value.estado : this.mesaActual?.estado
    };
    this.mesaService.actualizarMesa(nroMesa, mesaActualizada).subscribe({
      next: (response: Mesa) => { 
        console.log('Mesa actualizada:', response);
        this.mesaForm.reset();
        this.enviado = false; 
        this.mensaje = 'Mesa actualizada con éxito'; 
        this.router.navigate(['mesa/Lista']);
      },
      error: (error) => {
        console.error('Error al actualizar la mesa:', error);
        const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
        this.mensaje = `Error al actualizar la mesa: ${errorMsg}`; 
      }
    });
  } else {
    this.mensaje = 'Por favor, complete el formulario correctamente.'; 
  }
}

  enviar() {
    this.enviado = true; 
    this.actualizarMesa(); 
  }
}

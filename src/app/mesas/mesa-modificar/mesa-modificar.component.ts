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
  mesaActual: Mesa | null = null; // Inicializa con null

  constructor(
    private fb: FormBuilder, 
    private mesaService: MesaService,
    private router: Router // Para redireccionar si es necesario
  ) {
    this.mesaForm = this.fb.group({
      nro_mesa: ['', [Validators.required]],  // Este campo no acepta espacios
      cant_personas_max: ['', [this.numberOrWhitespaceValidator()]], // Permite espacios en blanco
      estado: ['', [this.whitespaceValidator()]] // Permite espacios en blanco
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

  // Validador que permite espacios en blanco pero verifica que sea un número válido
  numberOrWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value === '' || value.trim() === '') {
        return null; // Permite espacios en blanco
      }
      const valid = !isNaN(value) && value > 0; // Asegura que sea un número positivo
      return valid ? null : { 'invalidNumber': { value } };
    };
  }

  // Validador que permite solo espacios en blanco
  whitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value.trim() === '') {
        return null; // Permite espacios en blanco
      }
      return null; // También puedes agregar validaciones adicionales si es necesario
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
    // Convierte nro_mesa a número al momento de actualizar
    const nroMesa = Number(this.mesaForm.value.nro_mesa);

    // Verifica si la conversión a número fue exitosa
    if (isNaN(nroMesa)) {
      this.mensaje = 'Número de mesa inválido. Debe ser un número.';
      return; // Detiene la función si el número es inválido
    }

    const mesaActualizada: Partial<Mesa> = {
      nro_mesa: nroMesa, // Aquí utilizas el número convertido
      cant_personas_max: this.mesaForm.value.cant_personas_max ? parseInt(this.mesaForm.value.cant_personas_max, 10) : this.mesaActual?.cant_personas_max,
      estado: this.mesaForm.value.estado ? this.mesaForm.value.estado : this.mesaActual?.estado
    };

    this.mesaService.actualizarMesa(nroMesa, mesaActualizada).subscribe({
      next: (response: Mesa) => { 
        console.log('Mesa actualizada:', response);
        this.mesaForm.reset();
        this.enviado = false; 
        this.mensaje = 'Mesa actualizada con éxito'; 
        this.router.navigate(['mesas/Lista']); // Redirige a la página de la lista de mesas
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

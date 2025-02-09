import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlatoService } from '../../service/plato.service.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-plato-eliminar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './plato-eliminar.component.html',
  styleUrls: ['./plato-eliminar.component.scss']
})
export class PlatoEliminarComponent {
  platoForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private platoService: PlatoService,
    private router: Router
  ) {
    this.platoForm = this.fb.group({
      numPlato: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    });
  }

  get fc() {
    return this.platoForm.controls; 
  }

  eliminarPlato() {
    if (this.platoForm.valid) {
      const numPlato = this.platoForm.value.numPlato;
      this.platoService.eliminarPlato(numPlato).subscribe({
        next: () => {
          this.platoForm.reset();
          this.mensaje = 'Plato eliminado exitosamente';
          this.router.navigate(['plato/Lista']);
        },
        error: (error) => {
          console.error('Error al eliminar el plato:', error);
          this.mensaje = `Error al eliminar el plato: ${error.error?.message || error.message || 'Ocurrió un error desconocido'}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, ingrese un ID válido.';
    }
  }

  enviar() {
    this.eliminarPlato();
  }
}


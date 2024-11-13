import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IngredienteService } from '../../service/ingrediente.service.js';
import { Router, RouterModule } from '@angular/router';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-ingrediente-eliminar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './ingrediente-eliminar.component.html',
  styleUrl: './ingrediente-eliminar.component.scss'
})
export class IngredienteEliminarComponent implements OnInit {
  ingredienteForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredienteService,
    private router: Router 
  ) {
    this.ingredienteForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.ingredienteForm.controls; 
  }

  eliminarIngrediente() {
    if (this.ingredienteForm.valid) {
      const codigo = this.ingredienteForm.value.codigo;
      if (isNaN(Number(codigo))) {
        this.mensaje = 'Codigo inválido. Debe ser un número positivo.';
        return;
      }
      this.ingredienteService.eliminarIngrediente(codigo).subscribe({
        next: () => {
          this.ingredienteForm.reset();
          this.enviado = false;
          this.mensaje = 'Ingrediente eliminado exitosamente';
          this.router.navigate(['ingrediente/Lista']);
        },
        error: (error) => {
          console.error('Error al eliminar el ingrediente:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al eliminar el ingrediente: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true; 
    this.eliminarIngrediente();
  }
}

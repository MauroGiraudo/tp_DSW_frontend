import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ResenaService } from '../../service/resena.service';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-resena-eliminar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './resena-eliminar.component.html',
  styleUrls: ['./resena-eliminar.component.scss']
})
export class ResenaEliminarComponent implements OnInit {
  resenaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private resenaService: ResenaService,
    private router: Router
  ) {
    this.resenaForm = this.fb.group({
      nroPed: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.resenaForm.controls;
  }

  eliminarResena() {
    if (this.resenaForm.valid) {
      const nroPed = this.resenaForm.value.nroPed;
      
      if (isNaN(Number(nroPed))) {
        this.mensaje = 'Número de pedido inválido. Debe ser un número positivo.';
        return;
      }

      this.resenaService.eliminarResena(nroPed).subscribe({
        next: () => {
          this.resenaForm.reset();
          this.enviado = false;
          this.mensaje = 'Reseña eliminada exitosamente';
          this.router.navigate(['resena/lista']);
        },
        error: (error) => {
          console.error('Error al eliminar la reseña:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al eliminar la reseña: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.eliminarResena();
  }
}


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResenaService } from '../../service/resena.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-resena-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './resena-modificar.component.html',
  styleUrls: ['./resena-modificar.component.scss']
})
export class ResenaModificarComponent {
  resenaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private resenaService: ResenaService,
    private router: Router,
  ) {
    this.resenaForm = this.fb.group({
      nroPed: ['', [Validators.required]],
      cuerpo: ['', [Validators.required]],
      puntaje: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  get fc() {
    return this.resenaForm.controls;
  }

  modificarResena() {
    if (this.resenaForm.valid) {
      const resenaModificada = {
        nroPed: this.resenaForm.value.nroPed,
        cuerpo: this.resenaForm.value.cuerpo,
        puntaje: Number(this.resenaForm.value.puntaje)
      };

      this.resenaService.modificarResena(resenaModificada.nroPed, resenaModificada).subscribe({
        next: () => {
          this.mensaje = 'Reseña modificada exitosamente';
          this.resenaForm.reset();
          this.enviado = false;
          this.router.navigate(['resena/Lista']);
        },
        error: (error) => {
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al modificar la reseña: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.modificarResena();
  }
}


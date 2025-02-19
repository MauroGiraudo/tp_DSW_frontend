import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MesaService } from '../../service/mesa.service';
import { Mesa } from '../../models/mesa.models';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-eliminar-mesa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,TextInputComponent, DefaultButtonComponent],
  templateUrl: './mesa-eliminar.component.html',
  styleUrls: ['./mesa-eliminar.component.scss']
})
export class MesaEliminarComponent implements OnInit {
  mesaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private mesaService: MesaService,
    private router: Router
  ) {
    this.mesaForm = this.fb.group({
      nro_mesa: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.mesaForm.controls;
  }

  eliminarMesa() {
    if (this.mesaForm.valid) {
      const nroMesa = Number(this.mesaForm.value.nro_mesa);

      if (isNaN(nroMesa)) {
        this.mensaje = 'Número de mesa inválido. Debe ser un número.';
        return;
      }

      this.mesaService.eliminarMesa(nroMesa).subscribe({
        next: () => {
          this.mesaForm.reset();
          this.enviado = false;
          this.mensaje = 'Mesa eliminada exitosamente';
          this.router.navigate(['mesa/Lista']);
        },
        error: (error) => {
          console.error('Error al eliminar la mesa:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al eliminar la mesa: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.eliminarMesa();
  }
}

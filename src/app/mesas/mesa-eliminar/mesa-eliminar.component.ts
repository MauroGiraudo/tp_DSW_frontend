import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MesaService } from '../../service/mesa.service.js';
import { Mesa } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

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
    private router: Router // Para redireccionar si es necesario
  ) {
    this.mesaForm = this.fb.group({
      nro_mesa: ['', [Validators.required]],  // Solo se necesita el número de mesa
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
          this.router.navigate(['mesas/Lista']); // Redirige a la página de la lista de mesas
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

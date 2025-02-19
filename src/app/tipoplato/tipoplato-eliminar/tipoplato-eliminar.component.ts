import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TipoplatoService } from '../../service/tipoplato.service';
import { Tipoplato } from '../../models/mesa.models';  // Asegúrate de que la ruta sea correcta
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-eliminar-tipoplato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './tipoplato-eliminar.component.html',
  styleUrls: ['./tipoplato-eliminar.component.scss']
})
export class TipoplatoEliminarComponent implements OnInit {
  tipoPlatoForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tipoPlatoService: TipoplatoService,
    private router: Router
  ) {
    this.tipoPlatoForm = this.fb.group({
      numPlato: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.tipoPlatoForm.controls;
  }

  eliminarTipoPlato() {
    if (this.tipoPlatoForm.valid) {
      const numPlato = this.tipoPlatoForm.value.numPlato;
      const descTPlato = this.tipoPlatoForm.value.descTPlato;
      if (isNaN(Number(numPlato))) {
        this.mensaje = 'Número de plato inválido. Debe ser un número positivo.';
        return;
      }
      this.tipoPlatoService.eliminarTipoPlato(numPlato).subscribe({
        next: () => {
          this.tipoPlatoForm.reset();
          this.enviado = false;
          this.mensaje = 'Tipo de plato eliminado exitosamente';
          this.router.navigate(['tipoplato/Lista']);
        },
        error: (error) => {
          console.error('Error al eliminar el tipo de plato:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al eliminar el tipo de plato: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.eliminarTipoPlato();
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TipoplatoService } from '../../service/tipoplato.service.js';
import { Tipoplato } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-modificar-tipoplato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './tipoplato-modificar.component.html',
  styleUrls: ['./tipoplato-modificar.component.scss']
})
export class TipoplatoModificarComponent implements OnInit {
  tipoPlatoForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;
  tipoPlatoActual: Tipoplato | null = null; // Inicializa con null

  constructor(
    private fb: FormBuilder,
    private tipoPlatoService: TipoplatoService, // Servicio de TipoPlato
    private router: Router // Para redireccionar si es necesario
  ) {
    this.tipoPlatoForm = this.fb.group({
      numPlato:['', [Validators.required]],  // Número del plato
      descTPlato: ['', [this.whitespaceValidator()]]  // Descripción del tipo de plato
    });
  }

whitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value.trim() === '') {
        return null; // Permite espacios en blanco
      }
      return null; 
    };
  }

  ngOnInit(): void {
    const numPlato = this.router.getCurrentNavigation()?.extras.state?.['numPlato'];
    if (numPlato) {
      this.obtenerTipoPlato(numPlato);
    }
  }

  get fc() {
    return this.tipoPlatoForm.controls; 
  }

  obtenerTipoPlato(numPlato: number) {
    this.tipoPlatoService.obtenerTipoPlato(numPlato).subscribe({
      next: (tipoPlato: Tipoplato) => {
        this.tipoPlatoActual = tipoPlato;
        this.tipoPlatoForm.patchValue({
          numPlato: tipoPlato.numPlato,
          descTPlato: tipoPlato.descTPlato,
          
        });
      },
      error: (error) => {
        console.error('Error al obtener el tipo de plato:', error);
        this.mensaje = 'Error al cargar los datos del tipo de plato';
      }
    });
  }

  actualizarTipoPlato() {
    if (this.tipoPlatoForm.valid) {
      const numPlato = this.tipoPlatoForm.value.numPlato;

      // Verifica que el ID sea un número válido
      if (isNaN(Number(numPlato))) {
        this.mensaje = 'ID inválido. Debe ser un número.';
        return;
      }

      // Creamos un objeto solo con los campos modificados
      const tipoPlatoActualizado: Partial<Tipoplato> = {
        descTPlato: this.tipoPlatoForm.value.descTPlato || this.tipoPlatoActual?.descTPlato,
        numPlato: this.tipoPlatoForm.value.numPlato ? parseInt(this.tipoPlatoForm.value.numPlato, 10) : this.tipoPlatoActual?.numPlato,
      };

      this.tipoPlatoService.actualizarTipoPlato(numPlato, tipoPlatoActualizado).subscribe({
        next: (response: Tipoplato) => {
          console.log('Tipo de plato actualizado:', response);
          this.tipoPlatoForm.reset();
          this.enviado = false;
          this.mensaje = 'Tipo de plato actualizado exitosamente';
          this.router.navigate(['tipoplato/Lista']) // Redirige a la página de la lista de tipos de plato
        },
        error: (error) => {
          console.error('Error al actualizar el tipo de plato:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al actualizar el tipo de plato: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.actualizarTipoPlato();
  }
}

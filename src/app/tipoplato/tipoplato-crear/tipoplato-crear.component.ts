import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TipoplatoService } from '../../service/tipoplato.service.js';
import { Tipoplato } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-tipoplato-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './tipoplato-crear.component.html',
  styleUrls: ['./tipoplato-crear.component.scss']
})
export class TipoplatoCrearComponent implements OnInit {
  tipoPlatoForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private tipoPlatoService: TipoplatoService, 
    private router: Router 
  ) {
    this.tipoPlatoForm = this.fb.group({
      descTPlato: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.tipoPlatoForm.controls; 
  }

  crearTipoPlato() {
    if (this.tipoPlatoForm.valid) {
      const nuevoTipoPlato: Tipoplato = {
        numPlato: 0, 
        descTPlato: this.tipoPlatoForm.value.descTPlato
      };

      this.tipoPlatoService.crearTipoPlato(nuevoTipoPlato).subscribe({
        next: (response: Tipoplato) => { 
          console.log('Tipo de plato creado:', response);
          this.tipoPlatoForm.reset();
          this.enviado = false; 
          this.mensaje = 'Tipo de plato agregado exitosamente'; 
          this.router.navigate(['tipoplato/Lista']);
        },
        error: (error) => {
          console.error('Error al crear el tipo de plato:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al crear el tipo de plato: ${errorMsg}`; 
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.crearTipoPlato(); 
  }
}

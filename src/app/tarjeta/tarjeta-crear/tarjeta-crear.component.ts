import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TipoTarjetaService } from '../../service/tipo-tarjeta.service.js';
import { NuevoTipotarjeta } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-tarjeta-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent,RouterModule],
  templateUrl: './tarjeta-crear.component.html',
  styleUrl: './tarjeta-crear.component.scss'
})
export class TarjetaCrearComponent implements OnInit{
  tipoTarjetaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private TipoTarjetaService: TipoTarjetaService, 
    private router: Router 
  ) {
    this.tipoTarjetaForm = this.fb.group({
      descTarjeta: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.tipoTarjetaForm.controls; 
  }

  crearTipoTarjeta() {
    if (this.tipoTarjetaForm.valid) {
      const nuevoTipoTarjeta: NuevoTipotarjeta = {
        descTarjeta: this.tipoTarjetaForm.value.descTarjeta
      };

      this.TipoTarjetaService.crearTipoTarjeta(nuevoTipoTarjeta).subscribe({
        next: (response: NuevoTipotarjeta) => { 
          console.log('Tipo de tarjeta creado:', response);
          this.tipoTarjetaForm.reset();
          this.enviado = false; 
          this.mensaje = 'Tipo de tarjeta agregado exitosamente'; 
          this.router.navigate(['tarjeta/Lista']);
        },
        error: (error) => {
          console.error('Error al crear el tipo de tarjeta:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al crear el tipo de tarjeta: ${errorMsg}`; 
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.crearTipoTarjeta(); 
  }
}

  


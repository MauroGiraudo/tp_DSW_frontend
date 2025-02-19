import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MesaService } from '../../service/mesa.service';
import { Mesa } from '../../models/mesa.models';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-crear-mesa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './mesa-crear.component.html',
  styleUrls: ['./mesa-crear.component.scss']
})
export class MesaCrearComponent implements OnInit {
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
      cant_personas_max: ['', [Validators.required, Validators.min(1)]],
      estado: ['Disponible', Validators.required]
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.mesaForm.controls;
  }

  crearMesa() {
  if (this.mesaForm.valid) {
    const nuevaMesa: Mesa = {
      nro_mesa: this.mesaForm.value.nro_mesa,
      cant_personas_max: parseInt(this.mesaForm.value.cant_personas_max, 10),
      estado: this.mesaForm.value.estado
    };

    this.mesaService.crearMesa(nuevaMesa).subscribe({
      next: (response: Mesa) => {
        console.log('Mesa creada:', response);
        this.mesaForm.reset();
        this.enviado = false;
        this.mensaje = 'Mesa creada con éxito';
        this.router.navigate(['mesa/Lista']);
      },
      error: (error) => {
        console.error('Error al crear la mesa:', error);
        const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
        this.mensaje = `Error al crear la mesa: ${errorMsg}`;
      }
    });
  } else {
    this.mensaje = 'Por favor, complete el formulario correctamente.';
  }
}


  enviar() {
    this.enviado = true;
    this.crearMesa();
  }
}

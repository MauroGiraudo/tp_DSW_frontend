import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BebidaService } from '../../service/bebida.service.js';
import { Bebida } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-crear-bebida',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './bebida-crear.component.html',
  styleUrls: ['./bebida-crear.component.scss']
})
export class BebidaCrearComponent implements OnInit {
  bebidaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private bebidaService: BebidaService,
    private router: Router
  ) {
    this.bebidaForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      stock: [null, [Validators.required, Validators.min(0)]],
      unidadMedida: ['', [Validators.required]],
      contenido: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      alcohol: ['', Validators.required],
      imagen: ['', Validators.required],
      proveedor: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.bebidaForm.controls; 
  }

  crearBebida() {
    if (this.bebidaForm.valid) {
      const nuevaBebida: Bebida = {
        codBebida: this.bebidaForm.value.codBebida,
        descripcion: this.bebidaForm.value.descripcion,
        stock: parseFloat(this.bebidaForm.value.stock), 
        unidadMedida: this.bebidaForm.value.unidadMedida,
        contenido: parseFloat(this.bebidaForm.value.contenido), 
        precio: parseFloat(this.bebidaForm.value.precio), 
        alcohol: this.bebidaForm.value.alcohol,
        imagen: this.bebidaForm.value.imagen,
        proveedor: this.bebidaForm.value.proveedor
      };

      this.bebidaService.crearBebida(nuevaBebida).subscribe({
        next: (response: Bebida) => { 
          console.log('Bebida creada:', response);
          this.bebidaForm.reset();
          this.enviado = false; 
          this.mensaje = 'Bebida creada exitosamente'; 
          this.router.navigate(['cartaBebida/Lista']);
        },
        error: (error) => {
          console.error('Error al crear la bebida:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al crear la bebida: ${errorMsg}`; 
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.crearBebida(); 
  }
}


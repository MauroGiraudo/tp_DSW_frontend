import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlatoService } from '../../service/plato.service.js';
import { Plato } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-crear-plato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './plato-crear.component.html',
  styleUrls: ['./plato-crear.component.scss']
})
export class PlatoCrearComponent implements OnInit {
  platoForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private platoService: PlatoService,
    private router: Router 
  ) {
    // Formulario para crear un plato
    this.platoForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      tiempo: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      aptoCeliaco: [false, Validators.required],
      aptoVegetarianos: [false, Validators.required],
      aptoVeganos: [false, Validators.required],
      imagen: ['', Validators.required],
      tipoPlato: [null]
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.platoForm.controls; 
  }

  crearPlato() {
    if (this.platoForm.valid) {
      const nuevoPlato: Plato = {
        numPlato: 0,
        descripcion: this.platoForm.value.descripcion,
        tiempo: parseFloat(this.platoForm.value.tiempo), 
        precio: parseFloat(this.platoForm.value.precio), 
        aptoCeliaco: this.platoForm.value.aptoCeliaco,
        aptoVegetarianos: this.platoForm.value.aptoVegetarianos,
        aptoVeganos: this.platoForm.value.aptoVeganos,
        imagen: this.platoForm.value.imagen,
        tipoPlato: this.platoForm.value.tipoPlato ? parseInt(this.platoForm.value.tipoPlato) : undefined // Opcional
      };
      this.platoService.crearPlato(nuevoPlato).subscribe({
        next: (response: Plato) => { 
          console.log('Plato creado:', response);
          this.platoForm.reset();
          this.enviado = false; 
          this.mensaje = 'Plato creado exitosamente'; 
          this.router.navigate(['cartaComida/Lista']); 
        },
        error: (error) => {
          console.error('Error al crear el plato:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al crear el plato: ${errorMsg}`; 
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.crearPlato(); 
  }
}

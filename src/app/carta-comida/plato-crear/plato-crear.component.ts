import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlatoService } from '../../service/plato.service.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';
import { Plato1 } from '../../models/mesa.models.js';

@Component({
  selector: 'app-crear-plato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './plato-crear.component.html',
  styleUrls: ['./plato-crear.component.scss'],
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
    this.platoForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      tiempo: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      tipoPlato: [null, Validators.required],
      aptoCeliaco: [false],
      aptoVegetarianos: [false],
      aptoVeganos: [false],
      imagen: [''], 
      ingredientes: this.fb.array([], Validators.required) 
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.platoForm.controls; 
  }

  get ingredientes() {
    return this.platoForm.get('ingredientes') as FormArray;
  }

  agregarIngrediente() {
    this.ingredientes.push(this.fb.group({
      ingrediente: [null, Validators.required],
      cantidadNecesaria: [null, [Validators.required, Validators.min(1)]]
    }));
  }

  eliminarIngrediente(index: number) {
    if (this.ingredientes.length > 0) {
      this.ingredientes.removeAt(index);
    }
  }

  crearPlato() {
    const nuevoPlato: Plato1 = {
      numPlato: 0,
      descripcion: this.platoForm.value.descripcion,
      tiempo: Number(this.platoForm.value.tiempo),
      precio: Number(this.platoForm.value.precio),
      tipoPlato: Number(this.platoForm.value.tipoPlato),
      aptoCeliaco: false,
      aptoVegetarianos: false,
      aptoVeganos: false,
      imagen: this.platoForm.value.imagen,
      ingredientes: this.platoForm.value.ingredientes.map((ing: any) => ({
        ingrediente: ing.ingrediente,
        cantidadNecesaria: Number(ing.cantidadNecesaria)
      }))
    };

    this.platoService.crearPlato(nuevoPlato).subscribe({
      next: (response) => { 
        console.log('Plato creado:', response);
        this.mensaje = 'Plato creado exitosamente'; 
        this.platoForm.reset({
          descripcion: '',
          tiempo: null,
          precio: null,
          tipoPlato: null,
          aptoCeliaco: false,
          aptoVegetarianos: false,
          aptoVeganos: false,
          imagen: '',
          ingredientes: []
        });
        this.enviado = false; 
        this.router.navigate(['cartaComida/Lista']); 
      },
      error: (error) => {
        console.error('Error al crear el plato:', error);
        const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
        this.mensaje = `Error al crear el plato: ${errorMsg}`; 
      }
    });
  }


  enviar() {
    this.enviado = true;
    if (this.platoForm.invalid) {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    } else {
      this.crearPlato(); 
    }
  }
}


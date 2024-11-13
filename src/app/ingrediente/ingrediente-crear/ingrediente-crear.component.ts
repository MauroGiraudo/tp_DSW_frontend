import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IngredienteService } from '../../service/ingrediente.service.js';
import { Ingrediente } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';


@Component({
  selector: 'app-ingrediente-crear',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,TextInputComponent,DefaultButtonComponent],
  templateUrl: './ingrediente-crear.component.html',
  styleUrl: './ingrediente-crear.component.scss'
})
export class IngredienteCrearComponent implements OnInit {
  ingredienteForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private ingredienteService: IngredienteService,
    private router: Router 
  ) {
    this.ingredienteForm= this.fb.group({
      codigo: [1, [Validators.required, Validators.min(1)]],
      descIngre: ['', [Validators.required]],
      puntoDePedido: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      unidadMedida: ['', [Validators.required]],
      aptoCeliacos: [false, [Validators.required]],
      aptoVegetarianos: [false, [Validators.required]],
      aptoVeganos: [false, [Validators.required]],
      proveedor: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.ingredienteForm.controls; 
  }

  crearIngrediente() {
    if (this.ingredienteForm.valid) {
      const nuevoIngrediente: Ingrediente = {
        codigo: 0,  
        descIngre: this.ingredienteForm.value.descIngre,
        puntoDePedido: parseFloat(this.ingredienteForm.value.puntoDePedido),
        stock: parseFloat(this.ingredienteForm.value.stock),
        unidadMedida: this.ingredienteForm.value.unidadMedida,
        aptoCeliacos: Boolean(this.ingredienteForm.value.aptoCeliacos),
        aptoVegetarianos: Boolean(this.ingredienteForm.value.aptoVegetarianos),
        aptoVeganos: Boolean(this.ingredienteForm.value.aptoVeganos),
        proveedor:parseFloat(this.ingredienteForm.value.proveedor),
      };
      this.ingredienteService.crearIngrediente(nuevoIngrediente).subscribe({
        next: (response: Ingrediente) => { 
          console.log('Ingrediente creado:', response);
          this.ingredienteForm.reset();
          this.enviado = false; 
          this.mensaje = 'Ingrediente agregado exitosamente'; 
          this.router.navigate(['ingrediente/Lista']);
        },
        error: (error) => {
          console.error('Error al crear el ingrediente:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al crear el ingrediente: ${errorMsg}`; 
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.crearIngrediente(); 
  }
}

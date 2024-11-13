import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Ingrediente } from '../../models/mesa.models.js';
import { IngredienteService } from '../../service/ingrediente.service.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-ingrediente-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './ingrediente-modificar.component.html',
  styleUrl: './ingrediente-modificar.component.scss'
})
export class IngredienteModificarComponent implements OnInit {
  ingredienteForm : FormGroup;
  enviado = false;
  mensaje: string | null = null;
  ingredienteActual: Ingrediente | null = null; 

  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredienteService,
    private router: Router 
  ) {
    this.ingredienteForm = this.fb.group({
    codigo: ['', [Validators.required]], 
    descIngre: ['', [this.whitespaceValidator()]],  
    puntoDePedido: ['', [this.numberOrWhitespaceValidator()]],
    stock: ['', [this.numberOrWhitespaceValidator()]],
    unidadMedida: ['', [this.whitespaceValidator()]],
    aptoCeliacos: [false, [this.booleanValidator()]], 
    aptoVegetarianos: [false, [this.booleanValidator()]], 
    aptoVeganos: [false, [this.booleanValidator()]],
    proveedor: ['', [this.numberOrWhitespaceValidator()]]
});
  }

   whitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value.trim() === '') {
        return null; 
      }
      return null; 
    };
  }

  numberOrWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value === '' || value.trim() === '') {
        return null;
      }
      const valid = !isNaN(value) && value > 0; 
      return valid ? null : { 'invalidNumber': { value } };
    };
  }

  booleanValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value === '' || value === null || value === undefined) {
      return null;
    }
    if (typeof value === 'boolean' || value === 'true' || value === 'false') {
      return null; 
    }
    return { 'invalidBoolean': { value } };
  };
}



  ngOnInit(): void {
    const codigo = this.router.getCurrentNavigation()?.extras.state?.['codigo'];
    if (codigo) {
      this.obtenerIngrediente(codigo);
    }
  }

  get fc() {
    return this.ingredienteForm.controls; 
  }

  obtenerIngrediente(codigo: number) {
    this.ingredienteService.obtenerIngrediente(codigo).subscribe({
      next: (ingrediente: Ingrediente) => {
        this.ingredienteActual = ingrediente;
        this.ingredienteForm.patchValue({
          codigo: ingrediente.codigo,
          descIngre: ingrediente.descIngre,
          puntoDePedido: ingrediente.puntoDePedido,
          stock: ingrediente.stock,
          unidadMedida: ingrediente.unidadMedida,
          aptoCeliacos: ingrediente.aptoCeliacos,
          aptoVegetarianos: ingrediente.aptoVegetarianos,
          aptoVeganos: ingrediente.aptoVeganos,
          proveedor: ingrediente.proveedor
        });
      },
      error: (error) => {
        console.error('Error al obtener el proveedor:', error);
        this.mensaje = 'Error al cargar los datos del proveedor';
      }
    });
  }

  actualizarIngrediente() {
    if (this.ingredienteForm.valid) {
      const codigoIngrediente = this.ingredienteForm.value.codigo;
      if (isNaN(Number(codigoIngrediente))) {
        this.mensaje = 'Codigo inválido. Debe ser un número.';
        return;
      }
      const ingredienteActualizado: Partial<Ingrediente> = {
        codigo: codigoIngrediente,
        descIngre: this.ingredienteForm.value.descIngre || this.ingredienteActual?.descIngre,
        puntoDePedido: this.ingredienteForm.value.puntoDePedido ? parseInt(this.ingredienteForm.value.puntoDePedido, 10) : this.ingredienteActual?.puntoDePedido,
        stock: this.ingredienteForm.value.stock ? parseInt(this.ingredienteForm.value.stock, 10) : this.ingredienteActual?.stock,
        unidadMedida: this.ingredienteForm.value.unidadMedida || this.ingredienteActual?.unidadMedida,
        aptoCeliacos: this.toBoolean(this.ingredienteForm.value.aptoCeliacos) || this.ingredienteActual?.aptoCeliacos,
        aptoVegetarianos: this.toBoolean(this.ingredienteForm.value.aptoVegetarianos) || this.ingredienteActual?.aptoVegetarianos,
        aptoVeganos: this.toBoolean(this.ingredienteForm.value.aptoVeganos) || this.ingredienteActual?.aptoVeganos,

        proveedor: this.ingredienteForm.value.proveedor || this.ingredienteActual?.proveedor,
      };
      this.ingredienteService.actualizarIngrediente(codigoIngrediente, ingredienteActualizado).subscribe({
        next: (response: Ingrediente) => {
          console.log('Ingrediente actualizado:', response);
          this.ingredienteForm.reset();
          this.enviado = false;
          this.mensaje = 'Ingrediente actualizado exitosamente';
          this.router.navigate(['ingrediente/Lista']); 
        },
        error: (error) => {
          console.error('Error al actualizar el ingrediente:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al actualizar el ingrediente: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  toBoolean(value: any): boolean {
  return value === true || value === 'true' || value === false || value === 'false';
}


  enviar() {
    this.enviado = true;
    this.actualizarIngrediente();
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BebidaService } from '../../service/bebida.service.js';  
import { Bebida } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-modificar-bebida',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './bebida-modificar.component.html',  
  styleUrls: ['./bebida-modificar.component.scss']  
})
export class BebidaModificarComponent implements OnInit {
  bebidaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;
  bebidaActual: Bebida | null = null; 

  constructor(
    private fb: FormBuilder, 
    private bebidaService: BebidaService,  
    private router: Router  
  ) {
    this.bebidaForm = this.fb.group({
      codBebida: ['', [Validators.required]],  
      descripcion: ['', [this.whitespaceValidator()]],
      stock:   ['', [this.numberOrWhitespaceValidator()]],
      unidadMedida: ['', [this.whitespaceValidator()]],  
      contenido: ['', [this.numberOrWhitespaceValidator()]],  
      precio: ['', [this.numberOrWhitespaceValidator()]],  
      alcohol: ['', [this.whitespaceValidator()]],  
      imagen: ['', [this.urlValidator()]],  
      proveedor: ['', [this.numberOrWhitespaceValidator()]]  
    });
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

  whitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value.trim() === '') {
        return null; 
      }
      return null; 
    };
  }

  urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;  
    }
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;  
    const isValid = pattern.test(control.value.trim());
    return isValid ? null : { invalidUrl: { value: control.value } };
  };
}

  ngOnInit(): void {
    const codBebida = this.router.getCurrentNavigation()?.extras.state?.['codBebida'];
    if (codBebida) {
      this.obtenerBebida(codBebida);
    }
  }

  get fc() {
    return this.bebidaForm.controls; 
  }


  obtenerBebida(codBebida: number) {
    this.bebidaService.obtenerBebida(codBebida).subscribe({
      next: (bebida: Bebida) => {
        this.bebidaActual = bebida;
        this.bebidaForm.patchValue({
          codBebida: bebida.codBebida,
          descripcion: bebida.descripcion,
          stock: bebida.stock,
          unidadMedida: bebida.unidadMedida,
          contenido: bebida.contenido,
          precio: bebida.precio,
          alcohol: bebida.alcohol,
          imagen: bebida.imagen,
          proveedor: bebida.proveedor
        });
      },
      error: (error) => {
        console.error('Error al obtener la bebida:', error);
        this.mensaje = 'Error al cargar los datos de la bebida';
      }
    });
  }

  actualizarBebida() {
    if (this.bebidaForm.valid) {
      const codBebida = Number(this.bebidaForm.value.codBebida);

      if (isNaN(codBebida)) {
        this.mensaje = 'Código de bebida inválido. Debe ser un número.';
        return;
      }
    const bebidaActualizada: Partial<Bebida> = {
      codBebida,
      descripcion: this.bebidaForm.value.descripcion || this.bebidaActual?.descripcion,
      stock: this.bebidaForm.value.stock ? parseInt(this.bebidaForm.value.stock, 10) : this.bebidaActual?.stock,
      unidadMedida: this.bebidaForm.value.unidadMedida || this.bebidaActual?.unidadMedida,
      contenido: this.bebidaForm.value.contenido ? parseInt(this.bebidaForm.value.contenido, 10) : this.bebidaActual?.contenido,
      precio: this.bebidaForm.value.precio ? parseFloat(this.bebidaForm.value.precio) : this.bebidaActual?.precio,
      alcohol: this.bebidaForm.value.alcohol || this.bebidaActual?.alcohol,
      imagen: this.bebidaForm.value.imagen || this.bebidaActual?.imagen,
      proveedor: this.bebidaForm.value.proveedor || this.bebidaActual?.proveedor,
    };
      this.bebidaService.actualizarBebida(codBebida, bebidaActualizada).subscribe({
        next: (response: Bebida) => { 
          console.log('Bebida actualizada:', response);
          this.bebidaForm.reset();
          this.enviado = false; 
          this.mensaje = 'Bebida actualizada exitosamente'; 
          this.router.navigate(['cartaBebida/Lista']);  
        },
        error: (error) => {
          console.error('Error al actualizar la bebida:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al actualizar la bebida: ${errorMsg}`; 
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true; 
    this.actualizarBebida(); 
  }
}

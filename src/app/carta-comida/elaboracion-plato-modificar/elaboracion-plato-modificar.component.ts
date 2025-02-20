import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ElaboracionplatoService } from '../../service/elaboracionplato.service.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';
import { tap } from 'rxjs';

@Component({
  selector: 'app-elaboracion-plato-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './elaboracion-plato-modificar.component.html',
  styleUrls: ['./elaboracion-plato-modificar.component.scss']
})
export class ElaboracionPlatoModificarComponent implements OnInit {
  elaboracionPlatoForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private elaboracionplatoService: ElaboracionplatoService, 
    private router: Router
  ) {
    this.elaboracionPlatoForm = this.fb.group({
      numPlato: [null, [Validators.required, Validators.min(1)]],  // Número del plato
      ingrediente: ['', [Validators.required]],  // Ingrediente a modificar
      cantidadNecesaria: [null, [Validators.required, Validators.min(0)]],  // Cantidad necesaria
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.elaboracionPlatoForm.controls; 
  }

  modificarIngrediente() {
    if (this.elaboracionPlatoForm.valid) {
      const { numPlato, ingrediente, cantidadNecesaria } = this.elaboracionPlatoForm.value;

      // Asegurarse de que la cantidad sea un número
      const cantidad = Number(cantidadNecesaria);

      if (!isNaN(cantidad) && cantidad > 0) {
        this.elaboracionplatoService.actualizarIngrediente(numPlato, ingrediente, cantidad).pipe(
          tap({
            next: (response) => { 
              console.log('Ingrediente modificado en el plato:', response);
              this.elaboracionPlatoForm.reset();
              this.enviado = false; 
              this.mensaje = 'Ingrediente modificado exitosamente'; 
              this.router.navigate([`cartaComida/ElaboracionLista`]);
            },
            error: (error) => {
              console.error('Error al modificar ingrediente:', error);
              const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
              this.mensaje = `Error al modificar ingrediente: ${errorMsg}`; 
            }
          })
        ).subscribe();
      } else {
        this.mensaje = 'Cantidad debe ser un número válido y mayor que cero.';
      }
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.modificarIngrediente(); 
  }
}


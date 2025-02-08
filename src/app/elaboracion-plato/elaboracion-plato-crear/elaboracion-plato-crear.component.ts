import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ElaboracionplatoService } from '../../service/elaboracionplato.service.js';
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-elaboracion-plato-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './elaboracion-plato-crear.component.html',
  styleUrls: ['./elaboracion-plato-crear.component.scss']
})
export class ElaboracionPlatoCrearComponent implements OnInit {
  elaboracionPlatoForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private elaboracionplatoService: ElaboracionplatoService, 
    private router: Router
  ) {
    this.elaboracionPlatoForm = this.fb.group({
      numPlato: [null, [Validators.required, Validators.min(1)]],  // Cambiado para que esté vacío por defecto
      ingrediente: ['', [Validators.required]],
      cantidadNecesaria: [null, [Validators.required, Validators.min(0)]],  // Cambiado para que esté vacío por defecto
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.elaboracionPlatoForm.controls; 
  }

  agregarIngrediente() {
    if (this.elaboracionPlatoForm.valid) {
      const { numPlato, ingrediente, cantidadNecesaria } = this.elaboracionPlatoForm.value;

      // Asegurarse de que la cantidad sea un número
      const cantidad = Number(cantidadNecesaria);

      if (!isNaN(cantidad) && cantidad > 0) {
        this.elaboracionplatoService.agregarIngrediente(numPlato, ingrediente, cantidad).subscribe({
          next: (response) => { 
            console.log('Ingrediente agregado al plato:', response);
            this.elaboracionPlatoForm.reset();
            this.enviado = false; 
            this.mensaje = 'Ingrediente agregado exitosamente'; 
            this.router.navigate([`platos/${numPlato}/detalle`]);
          },
          error: (error) => {
            console.error('Error al agregar ingrediente:', error);
            const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
            this.mensaje = `Error al agregar ingrediente: ${errorMsg}`; 
          }
        });
      } else {
        this.mensaje = 'Cantidad debe ser un número válido y mayor que cero.';
      }
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.agregarIngrediente(); 
  }
}


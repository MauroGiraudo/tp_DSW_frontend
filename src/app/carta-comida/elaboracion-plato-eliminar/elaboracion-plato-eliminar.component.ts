import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ElaboracionplatoService } from '../../service/elaboracionplato.service.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';
import { tap } from 'rxjs';

@Component({
  selector: 'app-elaboracion-plato-eliminar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './elaboracion-plato-eliminar.component.html',
  styleUrls: ['./elaboracion-plato-eliminar.component.scss']
})
export class ElaboracionPlatoEliminarComponent implements OnInit {
  elaboracionPlatoForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private elaboracionplatoService: ElaboracionplatoService, 
    private router: Router
  ) {
    this.elaboracionPlatoForm = this.fb.group({
      numPlato: [null, [Validators.required, Validators.min(1)]],
      ingrediente: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.elaboracionPlatoForm.controls; 
  }

  eliminarIngrediente() {
    if (this.elaboracionPlatoForm.valid) {
      const { numPlato, ingrediente } = this.elaboracionPlatoForm.value;

      this.elaboracionplatoService.eliminarIngrediente(numPlato, ingrediente).pipe(
        tap({
          next: () => {
            console.log(`Ingrediente ${ingrediente} del plato ${numPlato} eliminado exitosamente.`);
            this.elaboracionPlatoForm.reset();
            this.enviado = false; 
            this.mensaje = 'Ingrediente eliminado exitosamente'; 
            this.router.navigate([`cartaComida/ElaboracionLista`]);
          },
          error: (error) => {
            console.error(`Error al eliminar ingrediente: ${ingrediente}`, error);
            const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
            this.mensaje = `Error al eliminar ingrediente: ${errorMsg}`; 
          }
        })
      ).subscribe();
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.eliminarIngrediente(); 
  }
}

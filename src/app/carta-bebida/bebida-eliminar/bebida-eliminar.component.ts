import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BebidaService } from '../../service/bebida.service.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-eliminar-bebida',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './bebida-eliminar.component.html',
  styleUrls: ['./bebida-eliminar.component.scss']
})
export class BebidaEliminarComponent implements OnInit {
  bebidaForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bebidaService: BebidaService,
    private router: Router
  ) {
    this.bebidaForm = this.fb.group({
      codBebida: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      proveedor: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.bebidaForm.controls;  
  }

  eliminarBebida() {
    if (this.bebidaForm.valid) {
      const codBebida = this.bebidaForm.controls['codBebida'].value;  

      // Elimina las dependencias primero
      this.bebidaService.eliminarBebidaConDependencias(codBebida, this.bebidaForm.controls['proveedor'].value).subscribe({
        next: () => {
          // Después de la eliminación exitosa, reiniciamos el formulario y mostramos el mensaje de éxito
          this.bebidaForm.reset();
          this.enviado = false;
          this.mensaje = 'Bebida eliminada exitosamente';


          this.router.navigate(['bebidas/Lista']); // Redirige a la lista de bebidas
        },
        error: (error) => {
          console.error('Error al eliminar las dependencias de la bebida:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido al eliminar dependencias';
          this.mensaje = `Error al eliminar dependencias de la bebida: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.eliminarBebida();
  }
}



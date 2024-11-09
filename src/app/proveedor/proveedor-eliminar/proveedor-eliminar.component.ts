import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProveedorService } from '../../service/proveedor.service.js'; 
import { Proveedor } from '../../models/mesa.models.js'; 
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-eliminar-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './proveedor-eliminar.component.html',
  styleUrls: ['./proveedor-eliminar.component.scss']
})
export class ProveedorEliminarComponent implements OnInit {
  proveedorForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router // Para redireccionar si es necesario
  ) {
    this.proveedorForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Validación de id (número positivo)
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.proveedorForm.controls; 
  }

  eliminarProveedor() {
    if (this.proveedorForm.valid) {
      const id = this.proveedorForm.value.id;

      // Verifica que el ID sea un número válido
      if (isNaN(Number(id))) {
        this.mensaje = 'ID inválido. Debe ser un número positivo.';
        return;
      }

      this.proveedorService.eliminarProveedor(id).subscribe({
        next: () => {
          this.proveedorForm.reset();
          this.enviado = false;
          this.mensaje = 'Proveedor eliminado exitosamente';
          this.router.navigate(['proveedores/Lista']); // Redirige a la página de la lista de proveedores
        },
        error: (error) => {
          console.error('Error al eliminar el proveedor:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al eliminar el proveedor: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true; 
    this.eliminarProveedor();
  }
}


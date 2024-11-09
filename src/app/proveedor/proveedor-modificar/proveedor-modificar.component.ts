import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProveedorService } from '../../service/proveedor.service.js'; 
import { Proveedor } from '../../models/mesa.models.js';
import { TextInputComponent } from '../../text-input/text-input.component.js';
import { DefaultButtonComponent } from '../../default-button/default-button.component.js';

@Component({
  selector: 'app-modificar-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './proveedor-modificar.component.html',
  styleUrls: ['./proveedor-modificar.component.scss']
})
export class ProveedorModificarComponent implements OnInit {
  proveedorForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;
  proveedorActual: Proveedor | null = null; // Inicializa con null

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router // Para redireccionar si es necesario
  ) {
    this.proveedorForm = this.fb.group({
      id: ['', [Validators.required]],  // Este campo es obligatorio
      razonSocial: [''],  
      cuit: [''],
      direccion: [''],
      ciudad: [''],
      provincia: [''],
      pais: [''],
      telefono: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    const id = this.router.getCurrentNavigation()?.extras.state?.['id'];
    if (id) {
      this.obtenerProveedor(id);
    }
  }

  get fc() {
    return this.proveedorForm.controls; 
  }

  obtenerProveedor(id: number) {
    this.proveedorService.obtenerProveedor(id).subscribe({
      next: (proveedor: Proveedor) => {
        this.proveedorActual = proveedor;
        this.proveedorForm.patchValue({
          id: proveedor.id,
          razonSocial: proveedor.razonSocial,
          cuit: proveedor.cuit,
          direccion: proveedor.direccion,
          ciudad: proveedor.ciudad,
          provincia: proveedor.provincia,
          pais: proveedor.pais,
          telefono: proveedor.telefono,
          email: proveedor.email
        });
      },
      error: (error) => {
        console.error('Error al obtener el proveedor:', error);
        this.mensaje = 'Error al cargar los datos del proveedor';
      }
    });
  }

  actualizarProveedor() {
    if (this.proveedorForm.valid) {
      const idProveedor = this.proveedorForm.value.id;

      // Verifica que el ID sea un número válido
      if (isNaN(Number(idProveedor))) {
        this.mensaje = 'ID inválido. Debe ser un número.';
        return;
      }

      // Creamos un objeto solo con los campos modificados
      const proveedorActualizado: Partial<Proveedor> = {
        id: idProveedor,
        razonSocial: this.proveedorForm.value.razonSocial || this.proveedorActual?.razonSocial,
        cuit: this.proveedorForm.value.cuit || this.proveedorActual?.cuit,
        direccion: this.proveedorForm.value.direccion || this.proveedorActual?.direccion,
        ciudad: this.proveedorForm.value.ciudad || this.proveedorActual?.ciudad,
        provincia: this.proveedorForm.value.provincia || this.proveedorActual?.provincia,
        pais: this.proveedorForm.value.pais || this.proveedorActual?.pais,
        telefono: this.proveedorForm.value.telefono || this.proveedorActual?.telefono,
        email: this.proveedorForm.value.email || this.proveedorActual?.email
      };

      this.proveedorService.actualizarProveedor(idProveedor, proveedorActualizado).subscribe({
        next: (response: Proveedor) => {
          console.log('Proveedor actualizado:', response);
          this.proveedorForm.reset();
          this.enviado = false;
          this.mensaje = 'Proveedor actualizado exitosamente';
          this.router.navigate(['proveedores/Lista']); // Redirige a la página de la lista de proveedores
        },
        error: (error) => {
          console.error('Error al actualizar el proveedor:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al actualizar el proveedor: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.actualizarProveedor();
  }
}

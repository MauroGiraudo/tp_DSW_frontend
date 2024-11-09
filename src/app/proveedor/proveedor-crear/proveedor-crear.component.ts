import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProveedorService } from '../../service/proveedor.service.js';
import { Proveedor } from '../../models/mesa.models.js'; 
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterModule],
  templateUrl: './proveedor-crear.component.html',
  styleUrls: ['./proveedor-crear.component.scss']
})
export class ProveedorCrearComponent implements OnInit {
  proveedorForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private proveedorService: ProveedorService,
    private router: Router 
  ) {
    this.proveedorForm = this.fb.group({
      cuit: ['', [Validators.required, Validators.pattern('[0-9]{11}')]], // Validación del CUIT
      razonSocial: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[+]{1}[0-9]{1,3}[ ]{0,1}[0-9]{1,4}[ ]{0,1}[0-9]{1,4}[ ]{0,1}[0-9]{1,4}$/)]], // Validación del teléfono
      email: ['', [Validators.required, Validators.email]] // Validación del email
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.proveedorForm.controls; 
  }

  crearProveedor() {
    if (this.proveedorForm.valid) {
      const nuevoProveedor: Proveedor = {
        id: 0,  
        cuit: this.proveedorForm.value.cuit,
        razonSocial: this.proveedorForm.value.razonSocial,
        direccion: this.proveedorForm.value.direccion,
        ciudad: this.proveedorForm.value.ciudad,
        provincia: this.proveedorForm.value.provincia,
        pais: this.proveedorForm.value.pais,
        telefono: this.proveedorForm.value.telefono,
        email: this.proveedorForm.value.email
      };

      this.proveedorService.crearProveedor(nuevoProveedor).subscribe({
        next: (response: Proveedor) => { 
          console.log('Proveedor creado:', response);
          this.proveedorForm.reset();
          this.enviado = false; 
          this.mensaje = 'Proveedor agregado exitosamente'; 
          this.router.navigate(['proveedor/Lista']); // Redirige a la página de lista de proveedores
        },
        error: (error) => {
          console.error('Error al crear el proveedor:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al crear el proveedor: ${errorMsg}`; 
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.'; 
    }
  }

  enviar() {
    this.enviado = true; 
    this.crearProveedor(); 
  }
}

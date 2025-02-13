import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TarjetaService } from '../../service/tarjeta.service'; // Asegúrate de que la ruta sea correcta
import { UsuarioService } from '../../service/usuario.service';  // Asegúrate de importar el servicio de usuario
import { TextInputComponent } from '../../text-input/text-input.component';
import { DefaultButtonComponent } from '../../default-button/default-button.component';

@Component({
  selector: 'app-tarjetacliente-eliminar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextInputComponent, DefaultButtonComponent],
  templateUrl: './tarjetacliente-eliminar.component.html',
  styleUrls: ['./tarjetacliente-eliminar.component.scss']
})
export class TarjetaclienteEliminarComponent implements OnInit {
  tarjetaEliminarForm: FormGroup;
  enviado = false;
  mensaje: string | null = null;
  clienteId: number;

  constructor(
    private fb: FormBuilder,
    private tarjetaService: TarjetaService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.clienteId = this.usuarioService.obtenerUsuarioActual().id; // Obtenemos el ID del cliente
    this.tarjetaEliminarForm = this.fb.group({
      tarjetaId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]] // Solo el ID de la tarjeta
    });
  }

  ngOnInit(): void {}

  get fc() {
    return this.tarjetaEliminarForm.controls; 
  }

  eliminarTarjeta() {
    if (this.tarjetaEliminarForm.valid) {
      const tarjetaId = this.tarjetaEliminarForm.value.tarjetaId;

      // Llamar al servicio para eliminar la tarjeta
      this.tarjetaService.eliminarTarjeta(this.clienteId, tarjetaId).subscribe({
        next: () => {
          this.tarjetaEliminarForm.reset();
          this.enviado = false;
          this.mensaje = 'Tarjeta eliminada exitosamente';
          this.router.navigate(['tarjeta/lista']);  // Redirigir a la lista de tarjetas
        },
        error: (error) => {
          console.error('Error al eliminar la tarjeta:', error);
          const errorMsg = error.error?.message || error.message || 'Ocurrió un error desconocido';
          this.mensaje = `Error al eliminar la tarjeta: ${errorMsg}`;
        }
      });
    } else {
      this.mensaje = 'Por favor, complete el formulario correctamente.';
    }
  }

  enviar() {
    this.enviado = true;
    this.eliminarTarjeta();
  }
}

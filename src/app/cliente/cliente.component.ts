import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service.js';
import { AlmacenamientoService } from '../service/almacenamiento.service.js';
import { Router } from '@angular/router';
import { Usuario } from '../shared/usuario.entity.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {
  usuario: Usuario = new Usuario(); // Inicializamos el usuario

  constructor(
    private usuarioService: UsuarioService,
    private almacenamientoService: AlmacenamientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Nos suscribimos al observable para obtener el estado del usuario
    this.usuarioService.usuarioObservable.subscribe(usuario => {
      this.usuario = usuario;
    });

    // Comprobamos si hay un indicador de redirección
    const redirigirAHome = this.almacenamientoService.getItem('redirigirAHome');
    if (redirigirAHome === 'true') {
      this.almacenamientoService.removeItem('redirigirAHome');
      this.router.navigateByUrl('/home');
    }
  }

  logOut(): void {
    this.usuarioService.logOutUsuario().subscribe((response) => {
      console.log(response.message); // Muestra el mensaje de respuesta en la consola
      this.almacenamientoService.setItem('redirigirAHome', 'true'); // Indicamos que se debe redirigir al home
      window.location.reload(); // Recargamos la página para aplicar los cambios
    });
  }
}


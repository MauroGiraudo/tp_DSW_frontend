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
  usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private almacenamientoService: AlmacenamientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.usuarioObservable.subscribe(usuario => {
      this.usuario = usuario;
    });
    const redirigirAHome = this.almacenamientoService.getItem('redirigirAHome');
    if (redirigirAHome === 'true') {
      this.almacenamientoService.removeItem('redirigirAHome');
      this.router.navigateByUrl('/home');
    }
  }

  logOut(): void {
    this.usuarioService.logOutUsuario().subscribe((response) => {
      console.log(response.message);
      this.almacenamientoService.setItem('redirigirAHome', 'true'); 
      window.location.reload();
    });
  }
}


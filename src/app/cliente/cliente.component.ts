import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service.js';
import { AlmacenamientoService } from '../service/almacenamiento.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private almacenamientoService: AlmacenamientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    const redirigirAHome = this.almacenamientoService.getItem('redirigirAHome')
    if(redirigirAHome === 'true') {
      this.almacenamientoService.removeItem('redirigirAHome')
      this.router.navigateByUrl('/home')
    }
  }

  logOut(): void {
    this.usuarioService.logOutUsuario().subscribe((response) => {
      console.log(response.message)
      this.almacenamientoService.setItem('redirigirAHome', 'true')
      window.location.reload()
    })
  }

}

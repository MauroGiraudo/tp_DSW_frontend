import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  template: `
    <h1>Acceso denegado. No tienes permisos para ver esta página.</h1>
    <button (click)="goHome()">Regresar al inicio</button>
  `,
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }
}


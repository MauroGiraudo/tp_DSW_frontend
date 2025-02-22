import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../service/usuario.service.js';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const expectedRoles = route.data['expectedRole'];
  const userRole = usuarioService.showTipoUsuario();

  if (!expectedRoles || expectedRoles.length === 0) {
    return true;
  }

  if (expectedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};



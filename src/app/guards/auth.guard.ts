import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../service/usuario.service.js';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const expectedRoles = route.data['expectedRole']; // Roles esperados para la ruta
  const userRole = usuarioService.showTipoUsuario(); // Obtener el rol del usuario actual

  // Si no hay roles definidos en la ruta (ruta abierta para todos los usuarios)
  if (!expectedRoles || expectedRoles.length === 0) {
    return true; // Permitir acceso a todos los usuarios
  }

  // Si el rol del usuario es uno de los roles esperados para esta ruta
  if (expectedRoles.includes(userRole)) {
    return true; // Permitir acceso
  }

  // Si el usuario no tiene un rol permitido, redirigir a la página de no autorizado
  router.navigate(['/unauthorized']);
  return false;
};



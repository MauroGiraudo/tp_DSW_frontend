import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component.js';
import { LoginComponent } from './login/login.component.js';
import { ClienteComponent } from './cliente/cliente.component.js';
import { RegistroComponent } from './registro/registro.component.js';
import { authGuard } from './guards/auth.guard.js';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component.js';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'registro', component: RegistroComponent },

  // RUTAS CLIENTE
  { 
    path: 'pedido', 
    loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule),
    canActivate: [authGuard], 
    data: { expectedRole: 'cliente' } 
  },

  { 
    path: 'resena',
    loadChildren: () => import('./resena/resena.module').then(m => m.ResenaModule),
    canActivate: [authGuard], 
    data: { expectedRole: 'cliente' }  
  },

  {
    path: 'tarjetaCliente',
    loadChildren: () => import('./tarjeta-cliente/tarjeta-cliente.module').then(m => m.TarjetaClienteModule),
    canActivate: [authGuard], 
    data: { expectedRole: 'cliente' }  
  },

  // RUTAS EMPLEADO
  { 
    path: 'tipoplato',
    loadChildren: () => import('./tipoplato/tipoplato.module').then(m => m.TipoplatoModule),
    canActivate: [authGuard], 
    data: { expectedRole: 'empleado' } 
  },

  { 
    path: 'proveedor', 
    loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule),
    canActivate: [authGuard], 
    data: { expectedRole: 'empleado' }  
  },

  { path: 'ingrediente', 
    loadChildren: () => import('./ingrediente/ingrediente.module').then(m => m.IngredienteModule),
    canActivate: [authGuard], 
    data: { expectedRole: 'empleado' } 
  },

  {path: 'mesa',
    loadChildren: () => import('./mesas/mesa.module').then(m => m.MesaModule),
    canActivate: [authGuard], 
    data: { expectedRole: 'empleado' }  
  },
  
  { path: 'tarjeta',
    loadChildren: () => import('./tarjeta/tarjeta.module').then(m => m.TarjetaModule),
    canActivate: [authGuard], 
    data: { expectedRole: 'empleado' } 
  },


  { path: 'cartaComida', 
    loadChildren: () => import('./carta-comida/plato.module.js').then(m => m.PlatoModule) 
  },

  { path: 'cartaBebida', 
    loadChildren: () => import('./carta-bebida/bebida.module').then(m => m.BebidaModule) 
  },

  // Ruta para página no autorizada (en caso de que no tenga acceso)
  { path: 'unauthorized', component: UnauthorizedComponent },
  
];


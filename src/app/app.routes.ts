import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component.js';
import { LoginComponent } from './login/login.component.js';
import { ClienteComponent } from './cliente/cliente.component.js';
import { RegistroComponent } from './registro/registro.component.js';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'cartaComida', 
    loadChildren: () => import('./carta-comida/plato.module.js').then(m => m.PlatoModule) 
  },
  { path: 'pedido', 
    loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule) },
  { path: 'registro', component: RegistroComponent },
  { path: 'proveedor', 
    loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule) },
  { path: 'mesa',
    loadChildren: () => import('./mesas/mesa.module').then(m => m.MesaModule)},
  { path: 'cartaBebida', 
    loadChildren: () => import('./carta-bebida/bebida.module').then(m => m.BebidaModule)},
      { path: 'tipoplato',
    loadChildren: () => import('./tipoplato/tipoplato.module').then(m => m.TipoplatoModule)}
];

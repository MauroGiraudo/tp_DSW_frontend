import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component.js';
import { LoginComponent } from './login/login.component.js';
import { ClienteComponent } from './cliente/cliente.component.js';
import { CartaComponent } from './carta/carta.component.js';
import { PedidoComponent } from './pedido/pedido.component.js';
import { RegistroComponent } from './registro/registro.component.js';
import { ProveedorComponent } from './proveedor/proveedor.component.js';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'carta', component: CartaComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'proveedor', component: ProveedorComponent }
];

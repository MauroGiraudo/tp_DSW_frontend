import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BebidaCrearComponent } from './bebida-crear/bebida-crear.component.js';
import { BebidaListaComponent } from './bebida-lista/bebida-lista.component.js';
import { BebidaModificarComponent } from './bebida-modificar/bebida-modificar.component.js';
import { BebidaEliminarComponent } from './bebida-eliminar/bebida-eliminar.component.js';
import { authGuard } from '../guards/auth.guard.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: BebidaCrearComponent,
    canActivate: [authGuard], 
    data: { expectedRole: ['empleado'] }
  },
  {
    path: 'Lista',
    component: BebidaListaComponent,
    canActivate: [authGuard], 
    data: { expectedRole: [] }
  },
  {
    path: 'Modificar',
    component: BebidaModificarComponent,
    canActivate: [authGuard], 
    data: { expectedRole: ['empleado'] }
  },
  {
    path: 'Eliminar',
    component: BebidaEliminarComponent,
    canActivate: [authGuard], 
    data: { expectedRole: ['empleado'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BebidaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatoCrearComponent } from './plato-crear/plato-crear.component.js';
import { PlatoListaComponent } from './plato-lista/plato-lista.component.js';
import { PlatoModificarComponent } from './plato-modificar/plato-modificar.component.js';
import { PlatoEliminarComponent } from './plato-eliminar/plato-eliminar.component.js';
import { ElaboracionPlatoListaComponent } from './elaboracion-plato-lista/elaboracion-plato-lista.component.js';
import { ElaboracionPlatoModificarComponent } from './elaboracion-plato-modificar/elaboracion-plato-modificar.component.js';
import { ElaboracionPlatoEliminarComponent } from './elaboracion-plato-eliminar/elaboracion-plato-eliminar.component.js';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'Lista',
    component: PlatoListaComponent,
    canActivate: [authGuard], // Asegúrate de que no esté protegido si es para todos
    data: { expectedRole: [] } // Accesible por todos
  },
  {
    path: 'Crear',
    component: PlatoCrearComponent,
    canActivate: [authGuard], // Solo accesible para empleados
    data: { expectedRole: ['empleado'] }
  },
  {
    path: 'Modificar',
    component: PlatoModificarComponent,
    canActivate: [authGuard], // Solo accesible para empleados
    data: { expectedRole: ['empleado'] }
  },
  {
    path: 'Eliminar',
    component: PlatoEliminarComponent,
    canActivate: [authGuard], // Solo accesible para empleados
    data: { expectedRole: ['empleado'] }
  },
  {
    path: 'ElaboracionLista',
    component: ElaboracionPlatoListaComponent,
    canActivate: [authGuard], // Solo accesible para empleados
    data: { expectedRole: ['empleado'] }
  },
  {
    path: 'ElaboracionModificar',
    component: ElaboracionPlatoModificarComponent,
    canActivate: [authGuard], // Solo accesible para empleados
    data: { expectedRole: ['empleado'] }
  },
  {
    path: 'ElaboracionEliminar',
    component: ElaboracionPlatoEliminarComponent,
    canActivate: [authGuard], // Solo accesible para empleados
    data: { expectedRole: ['empleado'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatoRoutingModule { }


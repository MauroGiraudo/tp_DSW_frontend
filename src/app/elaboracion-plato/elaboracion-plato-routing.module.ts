import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElaboracionPlatoCrearComponent } from './elaboracion-plato-crear/elaboracion-plato-crear.component.js';
import { ElaboracionPlatoListaComponent } from './elaboracion-plato-lista/elaboracion-plato-lista.component.js';
import { ElaboracionPlatoModificarComponent } from './elaboracion-plato-modificar/elaboracion-plato-modificar.component.js';
import { ElaboracionPlatoEliminarComponent } from './elaboracion-plato-eliminar/elaboracion-plato-eliminar.component.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: ElaboracionPlatoCrearComponent
  },
  {
    path: 'Lista',
    component: ElaboracionPlatoListaComponent
  },
  {
    path: 'Modificar',
    component: ElaboracionPlatoModificarComponent
  },
  {
    path: 'Eliminar',
    component: ElaboracionPlatoEliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElaboracionPlatoRoutingModule { }

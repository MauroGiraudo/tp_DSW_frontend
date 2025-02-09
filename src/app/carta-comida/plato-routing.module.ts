import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatoCrearComponent } from './plato-crear/plato-crear.component.js';
import { PlatoListaComponent } from './plato-lista/plato-lista.component.js';
import { PlatoModificarComponent } from './plato-modificar/plato-modificar.component.js';
import { PlatoEliminarComponent } from './plato-eliminar/plato-eliminar.component.js';
import { ElaboracionPlatoListaComponent } from './elaboracion-plato-lista/elaboracion-plato-lista.component.js';
import { ElaboracionPlatoModificarComponent } from './elaboracion-plato-modificar/elaboracion-plato-modificar.component.js';
import { ElaboracionPlatoEliminarComponent } from './elaboracion-plato-eliminar/elaboracion-plato-eliminar.component.js';
const routes: Routes = [
  {
    path: 'Crear',
    component: PlatoCrearComponent
  },
  {
    path: 'Lista',
    component: PlatoListaComponent
  },
  {
    path: 'Modificar',
    component: PlatoModificarComponent
  },
  {
    //ng g c bebida-Eliminar  --module bebida
    path: 'Eliminar',
    component: PlatoEliminarComponent
  },
    {
    path: 'ElaboracionLista',
    component: ElaboracionPlatoListaComponent
  },
  {
    path: 'ElaboracionModificar',
    component: ElaboracionPlatoModificarComponent
  },
  {
    //ng g c bebida-Eliminar  --module bebida
    path: 'ElaboracionEliminar',
    component: ElaboracionPlatoEliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatoRoutingModule { }

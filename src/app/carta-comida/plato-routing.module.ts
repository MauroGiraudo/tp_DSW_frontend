import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatoCrearComponent } from './plato-crear/plato-crear.component.js';
import { PlatoListaComponent } from './plato-lista/plato-lista.component.js';
import { PlatoModificarComponent } from './plato-modificar/plato-modificar.component.js';
import { PlatoEliminarComponent } from './plato-eliminar/plato-eliminar.component.js';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatoRoutingModule { }

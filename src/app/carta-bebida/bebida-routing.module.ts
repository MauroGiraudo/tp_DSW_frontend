import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BebidaCrearComponent } from './bebida-crear/bebida-crear.component.js';
import { BebidaListaComponent } from './bebida-lista/bebida-lista.component.js';
import { BebidaModificarComponent } from './bebida-modificar/bebida-modificar.component.js';
import { BebidaEliminarComponent } from './bebida-eliminar/bebida-eliminar.component.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: BebidaCrearComponent
  },
  {
    path: 'Lista',
    component: BebidaListaComponent
  },
  {
    path: 'Modificar',
    component: BebidaModificarComponent
  },
  {
    //ng g c bebida-Eliminar  --module bebida
    path: 'Eliminar',
    component: BebidaEliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BebidaRoutingModule { }

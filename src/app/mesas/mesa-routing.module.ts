import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesaListaComponent } from './mesa-lista/mesa-lista.component.js';
import { MesaCrearComponent } from './mesa-crear/mesa-crear.component.js';
import { MesaModificarComponent } from './mesa-modificar/mesa-modificar.component.js';
import { MesaEliminarComponent } from './mesa-eliminar/mesa-eliminar.component.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: MesaCrearComponent
  },
  {
    path: 'Lista',
    component: MesaListaComponent
  },
  {
    path: 'Modificar',
    component: MesaModificarComponent
  },
  {
    //ng g c mesa-Eliminar  --module mesa
    path: 'Eliminar',
    component: MesaEliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResenaCrearComponent } from './resena-crear/resena-crear.component.js';
import { ResenaListaComponent } from './resena-lista/resena-lista.component.js';
import { ResenaModificarComponent } from './resena-modificar/resena-modificar.component.js';
import { ResenaEliminarComponent } from './resena-eliminar/resena-eliminar.component.js';

const routes: Routes = [
  {
      path: 'Crear',
      component: ResenaCrearComponent
    },
    {
      path: 'Lista',
      component: ResenaListaComponent
    },
    {
      path: 'Modificar',
      component: ResenaModificarComponent
    },
    {
      path: 'Eliminar',
      component: ResenaEliminarComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResenaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoplatoModificarComponent } from './tipoplato-modificar/tipoplato-modificar.component.js';
import { TipoplatoEliminarComponent } from './tipoplato-eliminar/tipoplato-eliminar.component.js';
import { TipoplatoListaComponent } from './tipoplato-lista/tipoplato-lista.component.js';
import { TipoplatoCrearComponent } from './tipoplato-crear/tipoplato-crear.component.js';
import { TipoplatoComponent } from './tipoplato.component.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: TipoplatoCrearComponent
  },
  {
    path: 'Lista',
    component: TipoplatoListaComponent
  },
  {
    path: 'Modificar',
    component: TipoplatoModificarComponent
  },
  {
    path: 'Eliminar',
    component: TipoplatoEliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoplatoRoutingModule { }

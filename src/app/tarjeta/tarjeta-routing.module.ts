import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaCrearComponent } from './tarjeta-crear/tarjeta-crear.component.js';
import { TarjetaListaComponent } from './tarjeta-lista/tarjeta-lista.component.js';
import { TarjetaModificarComponent } from './tarjeta-modificar/tarjeta-modificar.component.js';
import { TarjetaEliminarComponent } from './tarjeta-eliminar/tarjeta-eliminar.component.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: TarjetaCrearComponent
  },
  {
    path: 'Lista',
    component: TarjetaListaComponent
  },
  {
    path: 'Modificar',
    component: TarjetaModificarComponent
  },
  {
    //ng g c tarjeta-Eliminar  --module tarjeta
    path: 'Eliminar',
    component:TarjetaEliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaRoutingModule { }

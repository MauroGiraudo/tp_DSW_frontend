import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaclienteCrearComponent } from './tarjetacliente-crear/tarjetacliente-crear.component.js';
import { TarjetaclienteListaComponent } from './tarjetacliente-lista/tarjetacliente-lista.component.js';
import { TarjetaclienteModificarComponent } from './tarjetacliente-modificar/tarjetacliente-modificar.component.js';
import { TarjetaclienteEliminarComponent } from './tarjetacliente-eliminar/tarjetacliente-eliminar.component.js';

const routes: Routes = [
  {
      path: 'Crear',
      component: TarjetaclienteCrearComponent
    },
    {
      path: 'Lista',
      component: TarjetaclienteListaComponent
    },
    {
      path: 'Modificar',
      component: TarjetaclienteModificarComponent
    },
    {
      path: 'Eliminar',
      component: TarjetaclienteEliminarComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaClienteRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoCrearComponent } from './pedido-crear/pedido-crear.component.js';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component.js';
import { PedidoModificarComponent } from './pedido-modificar/pedido-modificar.component.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: PedidoCrearComponent
  },
  {
    path: 'Modificar',
    component: PedidoModificarComponent
  },
  {
    path: 'Lista',
    component: PedidoListaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }

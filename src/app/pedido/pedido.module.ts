import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component.js';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    PedidoComponent
  ]
})
export class PedidoModule { }

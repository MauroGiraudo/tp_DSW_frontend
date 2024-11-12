import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatoRoutingModule } from './plato-routing.module';
import { CartaComidaComponents } from './carta.component.js';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlatoRoutingModule,
    CartaComidaComponents
  ]
})
export class PlatoModule { }

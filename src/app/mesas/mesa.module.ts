import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesasComponent } from './mesas.component.js';
import { MesaRoutingModule } from './mesa-routing.module.js';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MesasComponent,
    MesaRoutingModule 
  ]
})
export class MesaModule  { }
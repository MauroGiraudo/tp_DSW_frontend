import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaBebidaComponent } from './carta-bebida.component';  
import { BebidaRoutingModule } from './bebida-routing.module';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    BebidaRoutingModule,
    CartaBebidaComponent 
  ]
})
export class BebidaModule { }


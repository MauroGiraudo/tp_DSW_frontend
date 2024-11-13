import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorComponent } from './proveedor.component.js';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    ProveedorComponent
  ]
})
export class ProveedorModule { }

/*Para crear proveedor.module.ts y proveedor-routing.module.ts usar => 
ng g m proveedor --routing --flat true
Para agregar a declarations necesario quitar/comentar standalone: true e imports: [] del component
NO OLVIDAR modificar app.routes
Luego usar comando presente en proveedor-routing.module.ts para crear cada submenu */ 
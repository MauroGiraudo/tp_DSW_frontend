import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './proveedor.component.js';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component.js';
import { ProveedorCrearComponent } from './proveedor-crear/proveedor-crear.component.js';
import { ProveedorModificarComponent } from './proveedor-modificar/proveedor-modificar.component.js';
import { ProveedorEliminarComponent } from './proveedor-eliminar/proveedor-eliminar.component.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: ProveedorCrearComponent
  },
  {
    path: 'Lista',
    component: ProveedorListComponent
  },
  {
    path: 'Modificar',
    component: ProveedorModificarComponent
  },
  {
    //ng g c proveedor-Eliminar  --module proveedor
    path: 'Eliminar',
    component: ProveedorEliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }

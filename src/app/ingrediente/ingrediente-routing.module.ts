import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredienteCrearComponent } from './ingrediente-crear/ingrediente-crear.component.js';
import { IngredienteModificarComponent } from './ingrediente-modificar/ingrediente-modificar.component.js';
import { IngredienteEliminarComponent } from './ingrediente-eliminar/ingrediente-eliminar.component.js';
import { IngredienteListaComponent } from './ingrediente-lista/ingrediente-lista.component.js';

const routes: Routes = [
  {
    path: 'Crear',
    component: IngredienteCrearComponent
  },
  {
    path: 'Lista',
    component: IngredienteListaComponent
  },
  {
    path: 'Modificar',
    component: IngredienteModificarComponent
  },
  {
    //ng g c ingrediente-Eliminar  --module ingrediente
    path: 'Eliminar',
    component: IngredienteEliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredienteRoutingModule { }

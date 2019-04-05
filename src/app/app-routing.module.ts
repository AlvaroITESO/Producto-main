import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosListaComponent } from './productos/productos-lista/productos-lista.component';
import { ProductoDetalleComponent } from './productos/producto-detalle/producto-detalle.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'productos', component: ProductosComponent, children: [
  {path: '', component: ProductosListaComponent},
  {path: ':id', component: ProductoDetalleComponent}
  ]},
  {path: 'carrito',  component: ProductosComponent, children: [
  {path: '', component: ProductosListaComponent},
  {path: ':id', component: ProductoDetalleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

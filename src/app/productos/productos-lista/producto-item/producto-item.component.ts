import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../Producto';
import { ProductosListaComponent } from '../productos-lista.component';
import { ProductosService } from '../../productos.service';
import { iif } from 'rxjs';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  @Input() producto: Producto;
  @Output() detalle = new EventEmitter();
  @Output() borrar = new EventEmitter();
  @Output() añadir = new EventEmitter();
  modoCarrito = false;

  constructor(private productoLista: ProductosListaComponent,
    private productosService: ProductosService,
    ) { }

  ngOnInit() {
    this.modoCarrito = this.productoLista.modoCarrito;
  }

  detalleProducto() {
    console.log("hola");
    this.detalle.emit(this.producto);
  }

  borrarProducto() {
    console.log("hey");
    this.borrar.emit(this.producto);
  }

  toggleEditable(event) {
    if ( event.target.checked) {
      console.log(this.producto);

        this.añadir.emit(this.producto);
        this.productosService.addToCart1(this.producto);
        this.productosService.SumarProducto();
          
    }

    else if( !event.target.checked){
      this.productosService.borrarProducto1(this.producto.id);
      this.productosService.RestarProducto();

    }
  }

}

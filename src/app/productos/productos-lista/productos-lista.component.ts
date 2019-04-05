import { Component, OnInit } from '@angular/core';
import { Producto } from '../Producto';
import { Subscription } from 'rxjs';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[];
  carrito: Producto[];
  tmp: Producto[];
  private subscript: Subscription;
  modoCarrito = false;
  error = false;
  count=0;
  suma=0;

  constructor(private productosService: ProductosService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.productosService.currentLength=0;
    this.productos = this.productosService.getProductos();
    this.carrito = this.productosService.getCarrito();
    this.tmp= null;
   

    if (this.router.url == '/productos') {
      this.modoCarrito = false;
    } else {
      this.modoCarrito = true;
    }

    this.subscript = this.productosService.cambiaDato.subscribe((producto: Producto[]) => {
          this.productos = producto;
        }
      );
  }

  agregar() {
    this.tmp= this.productosService.getTemp();
    console.log(this.tmp);
    this.tmp.forEach(prod => {
      if (!this.productosService.addToCart(prod)) {
        this.error = true;
      }
    });
    this.productos = this.productosService.getProductos();
  }

  detalle(p: Producto) {
    this.router.navigate([p.id], {relativeTo: this.route});
  }

  borrar(p: Producto) {
    this.productosService.borrarProducto(p.id);
    this.carrito = this.productosService.getCarrito();
    this.sumar();
  }

 getCurrentItems(){
  return this.productosService.getCurrentLenght();
  }

  sumar() {
    this.suma=0;
    if(this.carrito!=null){
    this.carrito.forEach(pro => this.suma=pro.precio+this.suma);
    return this.suma;
  }
  else{
    return 0;
  }
    };


  

}

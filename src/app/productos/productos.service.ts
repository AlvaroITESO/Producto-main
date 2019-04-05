import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from './Producto';
import { ProductosListaComponent } from './productos-lista/productos-lista.component';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cambiaDato = new Subject<Producto[]>();
  private lastId = 1;

  productos: Producto[] = [
    new Producto(this.lastId++, 'Dell 5000', 'Dell', 'Laptop', 8500, 10),
    new Producto(this.lastId++, 'Hp Pro', 'HP', 'Laptop', 17000, 10),
    new Producto(this.lastId++, 'Buena Laptop', 'Samsung', 'Laptop', 16500, 10),
    new Producto(this.lastId++, 'MG7403', 'Toshiba', 'Laptop', 9700, 10),
    new Producto(this.lastId++, 'YG302', 'Lenovo', 'Laptop', 9999, 10),
    new Producto(this.lastId++, 'Hp menos pro', 'HP', 'Laptop' , 6969, 10),
    
  ];
carrito1: Producto[] = [];
 carrito: Producto[] = [];
currentLength=0;
suma=0;

  constructor() { }

  getNextId(): number {
    return this.lastId;
  }

  getProductos(): Producto[] {
    return this.productos.slice();
  }

  RestarProducto(){
    this.currentLength--;
  }

  SumarProducto(){
    this.currentLength++;
  }

  

  getProducto(id: number): Producto {
    const pos = this.productos.findIndex(al => al.id === id);
    return Object.assign({}, this.productos[pos]);
  }

  notificarCambios() {
    this.cambiaDato.next(this.productos.slice());
  }
  notificarCambiosCarrito() {
    this.cambiaDato.next(this.carrito.slice());
  }

  getCurrentLenght(){
    return this.currentLength;
  }

  addToCart(producto: Producto): boolean {
    const pro = this.carrito.find(pro => pro.nombre.toUpperCase() === producto.nombre.toUpperCase());
    if (pro) {
      return false;
    }
    this.carrito.push(Object.assign({}, producto));
    this.notificarCambiosCarrito();
    return true;
  }

  addToCart1(producto: Producto): boolean {
        const pro = this.carrito1.find(pro => pro.nombre.toUpperCase() === producto.nombre.toUpperCase());
        if (pro) {
          return false;
        }
        this.carrito1.push(Object.assign({}, producto));
        console.log(this.carrito1[0].existencia);
        
        return true;
      }

  getCarrito(): Producto[] {
    return this.carrito.slice();
  }

  getTemp(): Producto[] {
    return this.carrito1.slice();
  }
 

  borrarProducto(id: number): boolean {
    console.log("hola");
    const pos = this.carrito.findIndex(p => p.id == id);
    if (pos >= 0) {
      this.carrito.splice(pos, 1);
      this.notificarCambiosCarrito();
      return true;
    }
    return false;
  }

  borrarProducto1(id: number): boolean {
    console.log("hola");
    const pos = this.carrito1.findIndex(p => p.id == id);
    if (pos >= 0) {
      
      this.carrito1.splice(pos, 1);
      return true;
    }
    return false;
  }

}

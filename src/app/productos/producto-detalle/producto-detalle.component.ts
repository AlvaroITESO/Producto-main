import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../Producto';
import { Subscription } from 'rxjs';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto;
  id: number;
  error: boolean;

  constructor(private productosService: ProductosService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
          this.id = Number(params.id);
          this.error = false;
          this.producto = this.productosService.getProducto(this.id);
        });
  }

  return() {
    this.location.back();
  }

}

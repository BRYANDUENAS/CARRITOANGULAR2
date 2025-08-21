import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import productos from '../../../../assets/data/productos.json';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
}

@Component({
  selector: 'app-detalle-producto',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css'
})
export class DetalleProducto implements OnInit {
  producto: Producto | undefined;
  productosRelacionados: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.cargarProducto(id);
    });
  }

  cargarProducto(id: number) {
    // Buscar el producto en el JSON
    this.producto = productos.productos.find(p => p.id === id);

    if (!this.producto) {
      // Si no encuentra el producto, redirigir a home
      this.router.navigate(['/home']);
      return;
    }

    // Cargar productos relacionados (misma categoría, excluyendo el actual)
    this.productosRelacionados = productos.productos
      .filter(p => p.categoria === this.producto?.categoria && p.id !== id)
      .slice(0, 4); // Máximo 4 productos relacionados
  }

  // Método para formatear el precio
  formatearPrecio(precio: number): string {
    return `$${precio.toFixed(2)}`;
  }
}
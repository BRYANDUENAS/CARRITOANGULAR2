import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-administracion',
  imports: [CommonModule, FormsModule],
  templateUrl: './administracion.html',
  styleUrl: './administracion.css'
})
export class Administracion {
  productosTienda: Producto[] = productos.productos;
  productoSeleccionado: Producto = this.inicializarProducto();
  modoEdicion: boolean = false;
  mostrarModal: boolean = false;

  // Inicializar producto vacío
  private inicializarProducto(): Producto {
    return {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: 'camisetas',
      imagen: ''
    };
  }

  // Abrir modal para crear nuevo producto
  abrirModalCrear() {
    this.productoSeleccionado = this.inicializarProducto();
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  // Abrir modal para editar producto
  abrirModalEditar(producto: Producto) {
    this.productoSeleccionado = { ...producto };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  // Cerrar modal
  cerrarModal() {
    this.mostrarModal = false;
    this.productoSeleccionado = this.inicializarProducto();
  }

  // Guardar producto (crear o editar)
  guardarProducto() {
    if (this.modoEdicion) {
      // Editar producto existente
      const index = this.productosTienda.findIndex(p => p.id === this.productoSeleccionado.id);
      if (index !== -1) {
        this.productosTienda[index] = { ...this.productoSeleccionado };
      }
    } else {
      // Crear nuevo producto
      const nuevoId = Math.max(...this.productosTienda.map(p => p.id)) + 1;
      const nuevoProducto: Producto = {
        ...this.productoSeleccionado,
        id: nuevoId
      };
      this.productosTienda = [...this.productosTienda, nuevoProducto];
    }

    this.cerrarModal();
    // Aquí normalmente harías una llamada HTTP a tu API
    console.log('Producto guardado:', this.productoSeleccionado);
  }

  // Eliminar producto
  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productosTienda = this.productosTienda.filter(producto => producto.id !== id);
      // Aquí normalmente harías una llamada HTTP a tu API
      console.log('Producto eliminado:', id);
    }
  }

  // Categorías disponibles
  categorias: string[] = ['camisetas', 'pantalones', 'accesorios', 'zapatos', 'gorras'];
}
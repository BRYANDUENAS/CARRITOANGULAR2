import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Carrito } from './pages/carrito/carrito';
import { Registro } from './pages/registro/registro';
import { Administracion } from './pages/administracion/administracion';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';

export const routes: Routes = [
    // Ruta por defecto (redirige a home)
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: Home },

    { path: "carrito", component: Carrito },

    { path: "registro", component: Registro },

    { path: "administracion", component: Administracion },


    { path: "detallesdeproducto/:id", component: DetalleProducto }


];

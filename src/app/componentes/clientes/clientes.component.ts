import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Scroller } from 'primeng/scroller';
import { Productos } from '../../interfaces/productos';
import { Articulo } from '../../interfaces/articulos';
import { ServicioService } from '../../servicios/servicio.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { FilterPipe } from '../../servicios/filter.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, ButtonModule, DialogModule, TableModule, FormsModule, InputTextModule, CardModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  @ViewChild('sc') sc!: Scroller;

 
  clientes: any[] = [];
  errorMessage: string = '';
  client: boolean= false;
 
 filtroGlobal: string = '';
  cardNameValue: any;

  lastTouchTime: number = 0;
  touchTimeout: any;
  cardCodeValue: any;
  ListNumValue:any;
  priceList:any;
  productos: any[] = [ 
    { name: 'Filas', imageUrl: '../../../../assets/fondo1.jpg', precio: 200, descripcion:'hjfv' },
    { name: 'Adidass', imageUrl: '../../../../assets/fondo1.jpg', precio: 100,descripcion:'etntn'  },
    { name: 'CR_V', imageUrl: '../../../../assets/fondo1.jpg', precio: 400 , descripcion:'enrtn' },
    { name: 'PILOT', imageUrl: '../../../../assets/fondo1.jpg', precio: 300 , descripcion:'etnn' },
    { name: 'ODDYSSEY', imageUrl: '../../../../assets/fondo1.jpg', precio: 400  , descripcion:'tntn'},
    { name: 'RIDGELINE', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  , descripcion:'thnt'},
    { name: 'FIT', imageUrl: '../../../../assets/fondo1.jpg', precio: 2100 , descripcion:'ntn' },
    { name: 'CIVIC', imageUrl: '../../../../assets/fondo1.jpg', precio: 1200 , descripcion:'tntn' },
    { name: 'ACCORD', imageUrl: '../../../../assets/fondo1.jpg', precio: 200 , descripcion:'ntn' },
    { name: 'ACCESORIOS', imageUrl: '../../../../assets/fondo1.jpg', precio: 200 , descripcion:'vsw' },
    { name: 'LLANTAS', imageUrl: '../../../../assets/fondo1.jpg', precio: 200 , descripcion:'nrth' },
    { name: 'TODOS', imageUrl: '../../../../assets/fondo1.jpg', precio: 500 , descripcion:'tn' },

   
  ];

  //productosOriginales: Productos[] = [];
  productosOriginales: Productos[] = [];
  //articulosOriginales:Articulo[]=[];
  productosPaginados: Productos[] = [];
  //productosPaginados: Articulo[] = [];
  totalRegistros: number;
  paginaActual: number = 1;
  productosPorPagina: number = 9;
  filtroTexto: string = '';


  currentPage: number = 0;
  itemsPerPage: number = 9;
  totalPages!: number ;

  mostrarModal: boolean = false;
  mostrarCarrito: boolean = false;
  productoSeleccionado: Productos | undefined;
  precioTotal:any
 // productoSeleccionado: Articulo | undefined


  cantidadProductos: number = 1;
  cantidadProductosEnCarrito: number = 0;

  productosAgregados: any[] = [];
  carrito: any[] = [];
  
  articulos: Articulo[]=[];

  
  constructor(private servicioService: ServicioService) {
    this.totalRegistros = this.productos.length;
    //this.totalRegistros = this.articulos.length;
    //this.cargarProductos({ first: 0, rows: 9 });
    
   this.productosOriginales = [...this.productos];
    //this.articulosOriginales = [...this.articulos];
    this.cargarProductos({ first: 0, rows: this.productosPorPagina });
   // this.cargarProductosD({ first: 0, rows: this.productosPorPagina });
  }

  ngOnInit(): void {
    //this.obtenerClientes();
   
  }

  obtenerClientes(): void {
    this.servicioService.obtenerClientes().subscribe(
      (response) => {
        this.clientes = response.Data;
        console.log(this.clientes);
     
      },
      (error) => {
        this.errorMessage = 'Error al obtener los clientes: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  
  
  openNew3() {
 
    this.client = true
   }


   onrowTouchEnd(event: TouchEvent, cliente: any) {
    const now = new Date().getTime();
    const timeSinceLastTouch = now - this.lastTouchTime;
    if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
      // Doble toque detectado
      this.onrowDobleClick(cliente);
      clearTimeout(this.touchTimeout);
    } else {
      // Primer toque
      this.lastTouchTime = now;
      this.touchTimeout = setTimeout(() => {
        clearTimeout(this.touchTimeout);
      }, 300);
    }
  }

   onrowDobleClick(cliente: any) {
    this.cardNameValue = cliente.CardName;
    this.cardCodeValue = cliente.CardCode;
    this.ListNumValue = cliente.ListNum
  console.log(this.cardNameValue, this.cardCodeValue)
  console.log('valor del ListNum del cliente seleccionado', this.ListNumValue)
  this.client=false

 // this.obtenerDatosArticulos(this.ListNumValue);
    }


    hideDialog() {
      this.client = false
    }




   
    
    
    



  cargarProductos(event: LazyLoadEvent) {
    const startIndex = event.first || 0;
    const endIndex = startIndex + this.productosPorPagina;
    
    let productosFiltrados = this.productosOriginales.filter(producto =>
      Object.values(producto).some(propiedad =>
        propiedad.toString().toLowerCase().includes(this.filtroTexto.toLowerCase())
      )
    );
  
    this.totalRegistros = productosFiltrados.length;
  
    this.productosPaginados = productosFiltrados.slice(startIndex, endIndex);
    this.paginaActual = Math.floor(startIndex / this.productosPorPagina) + 1;
  }


  

  filtrarProductos() {
    if (this.filtroTexto.trim() === '') {
      // Si el filtro está vacío, restaura los productos originales y carga la primera página
      this.productos = [...this.productosOriginales];
      this.cargarProductos({ first: 0, rows: this.productosPorPagina });
    } else {
      // Si hay texto en el filtro, aplica el filtro a todos los productos y carga la primera página
      this.productos = this.productosOriginales.filter(producto =>
        Object.values(producto).some(propiedad =>
          propiedad.toString().toLowerCase().includes(this.filtroTexto.toLowerCase())
        )
      );
      this.cargarProductos({ first: 0, rows: this.productosPorPagina });
    }
  }


  

    irPaginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.cargarProductos({ first: (this.paginaActual - 1) * this.productosPorPagina, rows: this.productosPorPagina });
    }
  }

  irPaginaSiguiente() {
    const ultimaPagina = Math.ceil(this.productosOriginales.length / this.productosPorPagina);
    if (this.paginaActual < ultimaPagina) {
      this.paginaActual++;
      this.cargarProductos({ first: (this.paginaActual - 1) * this.productosPorPagina, rows: this.productosPorPagina });
    }
  }

  
  mostrarDetalles(producto: Productos) {
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }



 

  incrementarCantidad() {
    this.cantidadProductos++;
  }
  
  decrementarCantidad() {
    if (this.cantidadProductos > 1) {
      this.cantidadProductos--;
    }
  }

  
  calcularPrecio(): number {
    return this.productoSeleccionado?.precio * this.cantidadProductos;
  }


  calcularPrecioTotal(): number {
    let precioTotal = 0;
    this.productosAgregados.forEach(item => {
      precioTotal += item.precioTotal;
    });
    return precioTotal;
  }
  


  agregarAlCarrito(): void {
   
    const producto = this.productoSeleccionado;

    this. precioTotal = this.calcularPrecio();
    
   
    this.carrito.push({
      producto: producto,
      cantidad: this.cantidadProductos,
      precioTotal: this.precioTotal
    });
    this.mostrarModal = false;

    this.cantidadProductosEnCarrito++;

   
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
   
  }



  imprimirProductosCarrito(): void {
    // Obtener los datos del carrito del localStorage
    const carritoString: string | null = localStorage.getItem('carrito');
  
    // Verificar si hay datos en el carrito
    if (carritoString !== null) {
      // Convertir los datos del carrito a un array
      this.productosAgregados = JSON.parse(carritoString);
  
      // Imprimir los datos en la consola
    
      console.log('Productos gregados:', this.productosAgregados);
      
      console.log(this.productosAgregados);
      this.mostrarCarrito = true;
    } else {
      console.log('El carrito está vacío');
    }
  }

  


  
  
  abrirCarrito(): void {
    this.mostrarCarrito = true;
    this.imprimirProductosCarrito()
  }

  reset() {
    this.sc.scrollToIndex(0, 'smooth');
} 

eliminarProducto1(index: number) {
  this.productosAgregados.splice(index, 1);
}


eliminarProducto(index: number) {
  const productoEliminado = this.productosAgregados[index];
  console.log('Producto eliminado:', productoEliminado);
  
  this.productosAgregados.splice(index, 1);
  console.log('Productos restantes:', this.productosAgregados);
}


}

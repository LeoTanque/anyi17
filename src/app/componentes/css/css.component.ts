import { Component, ViewChild } from '@angular/core';
import { Productos, ServicioService } from '../../servicios/servicio.service';
import { LazyLoadEvent } from 'primeng/api';
import { Scroller } from 'primeng/scroller';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";




@Component({
    selector: 'app-css',
    standalone: true,
    templateUrl: './css.component.html',
    styleUrl: './css.component.scss',
    imports: [CommonModule, RouterModule, ButtonModule, InputTextModule, DialogModule, TableModule, FormsModule, NavbarComponent]
})


export class CssComponent {
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
   /* { name: 'Filas', imageUrl: '../../../../assets/fondo1.jpg', precio: 200, descripcion:'hjfv' },
    { name: 'Adidass', imageUrl: '../../../assets/fotos/fit.jpg', precio: 100,descripcion:'etntn'  },
    { name: 'CR_V', imageUrl: '../../../assets/fotos/accesorios.jpg', precio: 400 , descripcion:'enrtn' },
    { name: 'PILOT', imageUrl: '../../../../assets/fondo1.jpg', precio: 300 , descripcion:'etnn' },
    { name: 'ODDYSSEY', imageUrl: '../../../../assets/fondo1.jpg', precio: 400  , descripcion:'tntn'},
    { name: 'RIDGELINE', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  , descripcion:'thnt'},
    { name: 'FIT', imageUrl: '../../../../assets/fondo1.jpg', precio: 2100 , descripcion:'ntn' },
    { name: 'CIVIC', imageUrl: '../../../../assets/fondo1.jpg', precio: 1200 , descripcion:'tntn' },
    { name: 'ACCORD', imageUrl: '../../../../assets/fondo1.jpg', precio: 200 , descripcion:'ntn' },
    { name: 'ACCESORIOS', imageUrl: '../../../../assets/fondo1.jpg', precio: 200 , descripcion:'vsw' },
    { name: 'LLANTAS', imageUrl: '../../../../assets/fondo1.jpg', precio: 200 , descripcion:'nrth' },
    { name: 'TODOS', imageUrl: '../../../../assets/fondo1.jpg', precio: 500 , descripcion:'tn' },

   */
  ];

     
   
  productosOriginales: Productos[] = [];
 
  productosPaginados: Productos[] = [];

  totalRegistros: number | undefined;
  paginaActual: number = 1;
  productosPorPagina: number = 6;
  filtroTexto: string = '';


  currentPage: number = 0;
  itemsPerPage: number = 6;
  totalPages!: number ;

  mostrarModal: boolean = false;
  mostrarCarrito: boolean = false;
  productoSeleccionado: Productos | undefined;
  precioTotal:any



  cantidadProductos: number = 1;
  cantidadProductosEnCarrito: number = 0;

  productosAgregados: any[] = [];
  carrito: any[] = [];
  


  
  constructor(private servicioService: ServicioService) {
   // this.obtener()
   /* this.totalRegistros = this.productos.length;

    
   this.productosOriginales = [...this.productos];

    this.cargarProductos({ first: 0, rows: this.productosPorPagina });*/
 
  }

  ngOnInit(): void {
 
    this.cargarProductos();
  }

/* obtener(){
this.servicioService.obtenerProductos().subscribe(res=>{
  this.productos = res
  console.log(this.productos)

})
 }*/



 


    hideDialog() {
      this.client = false
      this.mostrarCarrito = false
    }


  cargarProductos1(event: LazyLoadEvent) {
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


  

  filtrarProductos1() {
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

  filtrarProductos(): void {
    this.cargarProductos({ first: 0, rows: this.productosPorPagina });
  }

  cargarProductos(event?: LazyLoadEvent): void {
    const startIndex = event ? event.first || 0 : 0;
    const endIndex = startIndex + this.productosPorPagina;

    this.servicioService.obtenerProductos().subscribe({
      next: (productos: Productos[]) => {
        this.productosOriginales = productos;
        this.totalRegistros = productos.length;
        this.filtrarYPaginarProductos(startIndex, endIndex);
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los productos';
        console.error(error);
      }
    });
  }

  filtrarYPaginarProductos(startIndex: number, endIndex: number): void {
    let productosFiltrados = this.productosOriginales.filter(producto =>
      Object.values(producto).some(propiedad =>
        propiedad.toString().toLowerCase().includes(this.filtroTexto.toLowerCase())
      )
    );

    this.totalRegistros = productosFiltrados.length;
    this.productosPaginados = productosFiltrados.slice(startIndex, endIndex);
    this.paginaActual = Math.floor(startIndex / this.productosPorPagina) + 1;
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Productos {
  
  name: any;
  imageUrl: any;
  precio: any;
  descripcion:any
}
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  apiUrl = 'http://localhost:3000/products';
  constructor(private http:HttpClient) { }

  obtenerClientes():Observable<any>{
    return this.http.get<any>(this.apiUrl);
    }

    obtenerProductos():Observable<Productos[]>{
      return this.http.get<Productos[]>(this.apiUrl);
      }

 

}
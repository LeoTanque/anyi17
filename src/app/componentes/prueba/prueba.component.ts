import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-prueba',
    standalone: true,
    templateUrl: './prueba.component.html',
    styleUrl: './prueba.component.scss',
    imports: [CommonModule, RouterModule, NavbarComponent]
})
export class PruebaComponent {

images:any[]=[
  {img:'../../../assets/fotos/fit.jpg'},
  {img: '../../../assets/fotos/accesorios.jpg'},
  {img: '../../../assets/fotos/cr_v.jpg'},
  {img: '../../../assets/fotos/cr_v-removebg-preview.png'},
  {img: '../../../assets/fotos/oddyssey.jpg'},
  {img:'../../../assets/fotos/fit.jpg'},
  {img: '../../../assets/fotos/accesorios.jpg'},
  {img: '../../../assets/fotos/cr_v.jpg'},
  {img: '../../../assets/fotos/cr_v-removebg-preview.png'},
  {img: '../../../assets/fotos/oddyssey.jpg'},
  {img:'../../../assets/fotos/fit.jpg'},
  {img: '../../../assets/fotos/accesorios.jpg'},
  {img: '../../../assets/fotos/cr_v.jpg'},
  {img: '../../../assets/fotos/cr_v-removebg-preview.png'},
  {img: '../../../assets/fotos/oddyssey.jpg'},
  {img:'../../../assets/fotos/fit.jpg'},
  {img: '../../../assets/fotos/accesorios.jpg'},
  {img: '../../../assets/fotos/cr_v.jpg'},
  {img: '../../../assets/fotos/cr_v-removebg-preview.png'},
  {img: '../../../assets/fotos/oddyssey.jpg'}
]

}

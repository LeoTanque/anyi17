import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-maquetacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './maquetacion.component.html',
  styleUrl: './maquetacion.component.scss'
})
export class MaquetacionComponent {

numeros:any[]=[
  {numero:1},
  {numero:2},
  {numero:3},
  {numero:4},
  {numero:5},
  {numero:6},
  {numero:7},
  {numero:8},
  {numero:9},
  {numero:10},
  {numero:11},
  {numero:12},
]

}

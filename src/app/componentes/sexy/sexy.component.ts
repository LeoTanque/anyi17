import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sexy',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, InputTextModule],
  templateUrl: './sexy.component.html',
  styleUrl: './sexy.component.scss'
})
export class SexyComponent {

@Input() usuario ='kjg' 

}

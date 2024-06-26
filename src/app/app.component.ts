import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RicotaComponent } from './componentes/ricota/ricota.component';
import { SexyComponent } from './componentes/sexy/sexy.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RicotaComponent, SexyComponent, LoginComponent, HttpClientModule, NavbarComponent, ClientesComponent],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.scss'
})
export class AppComponent {
  //title = 'anyi17'; 
}

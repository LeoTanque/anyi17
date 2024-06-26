import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../../servicios/authentication-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ToolbarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthenticationServiceService, private router:Router){

  }



  logout() {
    // Llama al método de logout en el servicio de autenticación
    this.authService.logout();
    // Redirige al usuario al componente de login
    this.router.navigate(['/login']);
  }
}

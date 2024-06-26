import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SexyComponent } from "../sexy/sexy.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AuthenticationServiceService } from '../../servicios/authentication-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule } from 'primeng/dialog'
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Users } from '../../interfaces/users';
import { PasswordModule } from 'primeng/password';
@Component({
    selector: 'app-ricota',
    standalone: true,
    templateUrl: './ricota.component.html',
    styleUrl: './ricota.component.scss',
    imports: [CommonModule, SexyComponent, RouterModule, ToolbarModule,  NavbarComponent, ButtonModule, TableModule, InputTextModule,
       FormsModule, DialogModule,PasswordModule ]
})
export class RicotaComponent implements OnInit {

  usuario: string='';
  logedIn: boolean = true;
  edicion:any
  modal:boolean = false
  filtroGlobal: string = '';
  usuarios: any[]=[];

selectedUser: Users = { id: 0, name: '', email: '', password: '', confirmPassword: '' }


constructor(private router:Router, private authService: AuthenticationServiceService, private activated: ActivatedRoute ){}


  ngOnInit(): void {
    this.getUsuarios();
  }


  getUsuarios(): void {
    this.authService.getUsers().subscribe(
      (data: Users[]) => {
        this.usuarios = data;
      },
      (error: any) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

dirigir(){
  this.router.navigate(['sexy'])
}

logout() {
 
  this.authService.logout();
 
  this.router.navigate(['/login']);
}


onDelete(usuario: any): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.deleteUser(usuario.id).subscribe(
        () => {
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
          this.getUsuarios(); // Actualizar la lista de usuarios después de eliminar
        },
        error => {
          console.error('Error al eliminar el usuario', error);
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el usuario.',
            'error'
          );
        }
      );
    }
  });
}

openModal(usuario: Users) {

  this.modal = true;
  this.selectedUser = { ...usuario }; 
  console.log(this.selectedUser)
}


hideDialog(){
  this.modal = false
}

onEdit() {
 
  this.authService.updateUser(this.selectedUser).subscribe(
    () => {
      Swal.fire('Actualizado', 'El usuario ha sido actualizado.', 'success');
      this.getUsuarios();
      this.hideDialog();
    },
    (    error: any) => {
      console.error('Error al actualizar el usuario', error);
      Swal.fire('Error', 'Hubo un problema al actualizar el usuario.', 'error');
    }
  );
}



}

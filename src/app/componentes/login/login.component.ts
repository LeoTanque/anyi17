import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../../servicios/authentication-service.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { passwordsMatchValidator } from '../../interfaces/passwordsMatchValidator';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, InputTextModule, ButtonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
 

  rightPanelActive: boolean = false;
  signupForm!: FormGroup;
  loginForm!: FormGroup;
 

  togglePanel() {
    this.rightPanelActive = !this.rightPanelActive;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: passwordsMatchValidator('password', 'confirmPassword')
    });

    

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


  }

/*
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsNotMatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }*/

 
  
  onSignup() {
    if (this.signupForm.valid) {
      const password = this.signupForm.get('password')?.value;
      const confirmPassword = this.signupForm.get('confirmPassword')?.value;
  
      if (confirmPassword === '') {
        // El campo de confirmación de contraseña está vacío
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe llenar el campo de confirmar contraseña.',
        });
        return; // Detener la ejecución del método
      }
  
      if (password !== confirmPassword) {
        // Contraseñas no coinciden, mostrar SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden.',
        });
        return; // Detener la ejecución del método
      }
  
      const registro = { ...this.signupForm.value };
      this.authService.signup(registro).subscribe(response => {
        console.log('Usuario registrado:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Usuario registrado con éxito.',
        });
        this.signupForm.reset();
        this.router.navigate(['/login']);
      });
    } else {
      // Manejar errores de validación
      if (this.signupForm.get('name')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar un nombre.');
      } else if (this.signupForm.get('name')?.errors?.['pattern']) {
        this.showErrorAlert('El nombre debe ser un string.');
      } else if (this.signupForm.get('email')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar un correo electrónico.');
      } else if (this.signupForm.get('email')?.errors?.['email']) {
        this.showErrorAlert('Formato de correo electrónico incorrecto.');
      } else if (this.signupForm.get('password')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar una contraseña.');
      } else if (this.signupForm.get('password')?.errors?.['minlength']) {
        this.showErrorAlert('La contraseña debe tener al menos 6 caracteres.');
      } else if (this.signupForm.get('confirmPassword')?.errors?.['required']) {
        this.showErrorAlert('Debe llenar el campo de confirmar contraseña.');
      } else if (this.signupForm.get('confirmPassword')?.errors?.['passwordsNotMatch']) {
        this.showErrorAlert('Las contraseñas no coinciden.');
      } else {
        this.showErrorAlert('Error desconocido.');
      }
    }
  }
  
  
  onLogin1() {
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      console.log(auth);
      this.authService.login(auth).subscribe(user => {
        if (user.error) {
     
          if (user.error === 'Usuario no registrado') {
            this.showErrorAlert('Usuario no registrado.');
          } else {
            this.showErrorAlert('Error desconocido.');
          }
          console.log('Error:', user.error);
        } else {
       
          console.log('Usuario autenticado:', user);
         
          localStorage.setItem('currentUser', JSON.stringify(user));
      
          this.router.navigate(['/ricota']);
        }
      });
    } else {
  
      if (this.loginForm.get('email')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar un correo electrónico.');
      } else if (this.loginForm.get('email')?.errors?.['email']) {
        this.showErrorAlert('Formato de correo electrónico incorrecto.');
      } else if (this.loginForm.get('password')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar una contraseña.');
      } else if (this.loginForm.get('password')?.errors?.['minlength']) {
        this.showErrorAlert('La contraseña debe tener al menos 6 caracteres.');
      } else {
        this.showErrorAlert('Error desconocido.');
      }
      console.log('Formulario inválido');
    }
  }

  onLogin2(): void {
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      console.log(auth);
      this.authService.login(auth).subscribe(user => {
        if (user.error) {
          if (user.error === 'Usuario no registrado') {
            this.showErrorAlert('Usuario no registrado.');
          } else {
            this.showErrorAlert('Error desconocido.');
          }
          console.log('Error:', user.error);
        } else {
          console.log('Usuario autenticado:', user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/ricota']);
        }
      });
    } else {
      if (this.loginForm.get('email')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar un correo electrónico.');
      } else if (this.loginForm.get('email')?.errors?.['email']) {
        this.showErrorAlert('Formato de correo electrónico incorrecto.');
      } else if (this.loginForm.get('password')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar una contraseña.');
      } else if (this.loginForm.get('password')?.errors?.['minlength']) {
        this.showErrorAlert('La contraseña debe tener al menos 6 caracteres.');
      } else {
        this.showErrorAlert('Error desconocido.');
      }
      console.log('Formulario inválido');
    }
  }


  onLogin(): void {
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      this.authService.login(auth).subscribe({
        next: user => {
          if (user.error) {
            if (user.error === 'Usuario no registrado') {
              this.showErrorAlert('Usuario no registrado.');
            } else {
              this.showErrorAlert('Error desconocido.');
            }
          } else {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/css']);
          }
        },
        error: () => {
          this.showErrorAlert('Usuario no registrado.');
        }
      });
    } else {
      if (this.loginForm.get('email')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar un correo electrónico.');
      } else if (this.loginForm.get('email')?.errors?.['email']) {
        this.showErrorAlert('Formato de correo electrónico incorrecto.');
      } else if (this.loginForm.get('password')?.errors?.['required']) {
        this.showErrorAlert('Debe ingresar una contraseña.');
      } else if (this.loginForm.get('password')?.errors?.['minlength']) {
        this.showErrorAlert('La contraseña debe tener al menos 6 caracteres.');
      } else {
        this.showErrorAlert('Error desconocido.');
      }
    }
  }
  

  showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }
  
 

}

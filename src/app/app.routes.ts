import { Routes } from '@angular/router';
import { RicotaComponent } from './componentes/ricota/ricota.component';
import { AppComponent } from './app.component';
import { SexyComponent } from './componentes/sexy/sexy.component';
import { LoginComponent } from './componentes/login/login.component';
import { authGuard } from './guard/auth.guard';
import { AuthGuardLogin } from './guard/login.guard';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { MaquetacionComponent } from './componentes/maquetacion/maquetacion.component';
import { PruebaComponent } from './componentes/prueba/prueba.component';
import { OrdenesComponent } from './componentes/ordenes/ordenes.component';
import { CssComponent } from './componentes/css/css.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent, canActivate: [AuthGuardLogin]},
    {path:'ricota', component:RicotaComponent,canActivate: [authGuard]  },
    {path:'sexy', component:SexyComponent, canActivate: [authGuard] },
    {path:'cliente', component:ClientesComponent, canActivate: [authGuard] },
    {path:'maqueta', component:MaquetacionComponent, canActivate: [authGuard] },
    {path:'prueba', component:PruebaComponent},
    {path:'orden', component:OrdenesComponent},
    { path:'css', component:CssComponent, canActivate: [authGuard]},
    { path: '**', redirectTo: 'login' }
];

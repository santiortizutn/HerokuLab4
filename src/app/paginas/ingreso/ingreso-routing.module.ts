import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../../componentes/error/error.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
    {path:'Login',component: LoginComponent},
    {path:'registro',component: RegistroComponent},
    {path: 'error' , component: ErrorComponent},
    {path:'', redirectTo: 'Login', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }

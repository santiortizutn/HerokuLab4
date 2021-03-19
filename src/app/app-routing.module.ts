import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { EjerciciosComponent } from './paginas/ejercicios/ejercicios.component';
import { ErrorComponent } from './paginas/error/error.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { QuiensoyComponent } from './paginas/quiensoy/quiensoy.component';

const routes: Routes = [

  {path: '' , component: BienvenidoComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'quiensoy' , component: QuiensoyComponent},
  {path: 'error' , component: ErrorComponent},
  {path: 'ejercicios' , component: EjerciciosComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

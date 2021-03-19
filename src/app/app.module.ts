import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { LoginComponent } from './paginas/login/login.component';
import { ErrorComponent } from './paginas/error/error.component';
import { HomeComponent } from './paginas/home/home.component';
import { QuiensoyComponent } from './paginas/quiensoy/quiensoy.component';
import { EjerciciosComponent } from './paginas/ejercicios/ejercicios.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    QuiensoyComponent,
    EjerciciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, BienvenidoComponent]
})
export class AppModule { }

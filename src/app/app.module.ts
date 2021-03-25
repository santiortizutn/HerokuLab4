import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { ErrorComponent } from './paginas/error/error.component';
import { HomeComponent } from './paginas/home/home.component';
import { QuiensoyComponent } from './paginas/quiensoy/quiensoy.component';
import { EjerciciosComponent } from './paginas/ejercicios/ejercicios.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from "@angular/common/http";

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AuthService } from './servicios/auth.service';
import { UsuariosService } from './servicios/usuarios.service';
import { RegistroComponent } from './paginas/registro/registro.component';
//



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    QuiensoyComponent,
    EjerciciosComponent,
    RegistroComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthService, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

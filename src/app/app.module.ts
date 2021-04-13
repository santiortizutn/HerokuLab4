import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './paginas/ingreso/error/error.component';
import { HomeComponent } from './paginas/principal/home/home.component';
import { LoginComponent } from './paginas/ingreso/login/login.component';
import { QuiensoyComponent } from './paginas/principal/quiensoy/quiensoy.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from './servicios/auth.service';
import { UsuariosService } from './servicios/usuarios.service';
import { RegistroComponent } from './paginas/ingreso/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JuegosComponent } from './paginas/principal/juegos/juegos/juegos.component';
import { MemotestComponent } from './paginas/principal/juegos/memotest/memotest.component';
import { PiedrapapeltijeraComponent } from './paginas/principal/juegos/piedrapapeltijera/piedrapapeltijera.component';
import { TatetiComponent } from './paginas/principal/juegos/tateti/tateti.component';



//angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
//

//firebase
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

//



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    QuiensoyComponent,
    LoginComponent,
    RegistroComponent,
    JuegosComponent,
    MemotestComponent,
    PiedrapapeltijeraComponent,
    TatetiComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //firebase
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //material
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule
  ],
  providers: [AuthService, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

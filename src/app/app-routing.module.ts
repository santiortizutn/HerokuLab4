import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', loadChildren: () => import('./paginas/ingreso/ingreso.module').then(m => m.IngresoModule)},
  { path: 'ingreso', loadChildren: () => import('./paginas/ingreso/ingreso.module').then(m => m.IngresoModule) },
  { path: 'principal', loadChildren: () => import('./paginas/principal/principal.module').then(m => m.PrinciaplModule) },
  { path: 'juegos', loadChildren: () => import('./paginas/principal/juegos/menu-juegos.module').then(m => m.MenuJuegosModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

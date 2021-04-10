import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JuegosComponent } from './juegos/juegos/juegos.component';
import { MemotestComponent } from './juegos/memotest/memotest.component';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{path: 'quiensoy' , component: QuiensoyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }

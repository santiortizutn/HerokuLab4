import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos/juegos.component';
import { MemotestComponent } from './memotest/memotest.component';
import { PiedrapapeltijeraComponent } from './piedrapapeltijera/piedrapapeltijera.component';
import { TatetiComponent } from './tateti/tateti.component';

const routes: Routes = [{ path: '', component: JuegosComponent },
{ path: 'memo', component: MemotestComponent },
{ path: 'ppt', component: PiedrapapeltijeraComponent },
{ path: 'tateti', component: TatetiComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuJuegosRoutingModule { }

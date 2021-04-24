import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dados21Component } from './dados21/dados21.component';
import { JuegosComponent } from './juegos/juegos.component';
import { MemotestComponent } from './memotest/memotest.component';
import { PiedrapapeltijeraComponent } from './piedrapapeltijera/piedrapapeltijera.component';
import { TatetiComponent } from './tateti/tateti.component';

const routes: Routes = [{ path: '', component: JuegosComponent },
{ path: 'memo', component: MemotestComponent },
{ path: 'ppt', component: PiedrapapeltijeraComponent },
{ path: 'tateti', component: TatetiComponent },
{ path: 'dados', component: Dados21Component }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuJuegosRoutingModule { }

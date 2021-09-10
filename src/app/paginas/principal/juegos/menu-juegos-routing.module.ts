import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { Dados21Component } from './dados21/dados21.component';
import { JuegosComponent } from './juegos/juegos.component';
import { MasmenosComponent } from './masmenos/masmenos.component';
import { MemotestComponent } from './memotest/memotest.component';
import { PiedrapapeltijeraComponent } from './piedrapapeltijera/piedrapapeltijera.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { TatetiComponent } from './tateti/tateti.component';

const routes: Routes = [{ path: '', component: JuegosComponent },
{ path: 'memo', component: MemotestComponent },
{ path: 'ppt', component: PiedrapapeltijeraComponent },
{ path: 'tateti', component: TatetiComponent },
{ path: 'dados', component: Dados21Component },
{ path: 'masmenos', component: MasmenosComponent },
{ path: 'preguntados', component: PreguntadosComponent },
{ path: 'ahorcado', component: AhorcadoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuJuegosRoutingModule { }

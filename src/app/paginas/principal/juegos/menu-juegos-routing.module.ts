import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos/juegos.component';
import { MemotestComponent } from './memotest/memotest.component';

const routes: Routes = [{ path: '', component: JuegosComponent },
{ path: 'memo', component: MemotestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuJuegosRoutingModule { }

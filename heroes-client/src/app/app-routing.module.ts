import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'heroes', loadChildren: () => import('./features/heroes/heroes.module').then(m => m.HeroesModule)},
  {path: '', redirectTo: 'heroes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

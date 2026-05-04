import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Artiste } from './artiste/artiste';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ConcertList } from './concerts/concert-list/concert-list';
import { ComponentForm } from './my-component/component-form/component-form';
import { ConcertForm } from './concerts/concert-form/concert-form';

const routes: Routes = [
  { path: 'artiste', component: Artiste },
  {
    path: 'concerts', children: [
      { path: '', component: ConcertList },
      { path: 'create', component: ConcertForm }
    ]
  },
  // {path:'concerts/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

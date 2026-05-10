import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Artiste } from './artiste/artiste';
import { ConcertList } from './concerts/concert-list/concert-list';
import { ComponentForm } from './my-component/component-form/component-form';
import { UserList } from './users/user-list/user-list';

const routes: Routes = [
  { path: 'artiste', component: Artiste },
  {
    path: 'concerts', children: [
      { path: '', component: ConcertList },
      { path: 'create', component: ComponentForm }
    ]
  },
  {
    path: 'users', children: [
      { path: '', component: UserList },
    ]
  },
  { path: '', redirectTo: 'concerts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Artiste } from './artiste/artiste';
import { ConcertList } from './concerts/concert-list/concert-list';
import { ComponentForm } from './my-component/component-form/component-form';
import { UserList } from './users/user-list/user-list';
import { ConcertForm } from './concerts/concert-form/concert-form';
import { Home } from './home/home';
import { UserForm } from './users/user-form/user-form';
import { UserDetails } from './users/user-details/user-details';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'artiste', component: Artiste },
  {
    path: 'concerts', children: [
      { path: '', component: ConcertList },
      { path: 'create', component: ConcertForm }
    ]
  },
  {
    path: 'users', children: [
      { path: '', component: UserList },
    ]
  },
  {
  path: 'users', children: [
    { path: '', component: UserList },
    { path: 'create', component: UserForm },
    { path: ':id/edit', component: UserForm }
  ]
},
{
  path: 'users', children: [
    { path: '', component: UserList },
    { path: 'create', component: UserForm },
    { path: ':id', component: UserDetails },
    { path: ':id/edit', component: UserForm }
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
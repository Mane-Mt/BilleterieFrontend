import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Artiste } from './artiste/artiste';
import { ConcertList } from './pages/concerts/concert-list/concert-list';
import { UserList } from './pages/users/user-list/user-list';
import { ConcertForm } from './pages/concerts/concert-form/concert-form';
import { Home } from './pages/home/home';
// import { ConcertDetails } from './pages/concerts/concert-details/concert-details';

const routes: Routes = [
  { path: 'artiste', component: Artiste },
  {
    path: 'concerts', children: [
      { path: '', component: ConcertList },
      { path: 'create', component: ConcertForm },
      // { path: ':id', component: ConcertDetails }
    ]
  },
  {
    path: 'users', children: [
      { path: '', component: UserList },
    ]
  },
  {path:'', component:Home}
  // { path: '', redirectTo: 'concerts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
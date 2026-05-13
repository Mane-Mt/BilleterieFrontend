import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Artiste } from './artiste/artiste';
import { ConcertList } from './pages/concerts/concert-list/concert-list';
import { ConcertForm } from './pages/concerts/concert-form/concert-form';
import { Home } from './pages/home/home';
import { UserList } from './pages/users/user-list/user-list';
import { UserForm } from './pages/users/user-form/user-form';
import { UserDetails } from './pages/users/user-details/user-details';
import { ConcertDetails } from './pages/concerts/concert-details/concert-details';
import { OrganizerList } from './pages/organizers/organizer-list/organizer-list';
import { OrganizerForm } from './pages/organizers/organizer-form/organizer-form';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminConcerts } from './pages/admin/admin-concerts/admin-concerts';
import { OrganizerDetails } from './pages/organizers/organizer-details/organizer-details';
import { ArtistList } from './pages/artists/artist-list/artist-list';
import { ArtistForm } from './pages/artists/artist-form/artist-form';
import { ArtistDetails } from './pages/artists/artist-details/artist-details';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'artiste', component: Artiste },
  {
    path: 'concerts', children: [
      { path: '', component: ConcertList },
      { path: 'create', component: ConcertForm },
      { path: ':id', component: ConcertDetails }
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
  {
    path: 'admin', children: [
      { path: '', component: AdminDashboard },
    ]
  },
  {
  path: 'admin', children: [
    { path: '', component: AdminDashboard },
    { path: 'concerts', component: AdminConcerts },
  ]
},
{
  path: 'organizers', children: [
    { path: '', component: OrganizerList },
  ]
},
{
  path: 'organizers', children: [
    { path: '', component: OrganizerList },
    { path: 'create', component: OrganizerForm },
    { path: ':id/edit', component: OrganizerForm }
  ]
},
{
  path: 'organizers', children: [
    { path: '', component: OrganizerList },
    { path: 'create', component: OrganizerForm },
    { path: ':id', component: OrganizerDetails },
    { path: ':id/edit', component: OrganizerForm }
  ]
},
{
  path: 'artists', children: [
    { path: '', component: ArtistList },
  ]
},
{
  path: 'artists', children: [
    { path: '', component: ArtistList },
    { path: 'create', component: ArtistForm },
    { path: ':id', component: ArtistDetails },
    { path: ':id/edit', component: ArtistForm }
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
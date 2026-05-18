import { NgModule, provideBrowserGlobalErrorListeners, signal } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MyComponent } from './my-component/my-component';
import { Artiste } from './artiste/artiste';
import { ComponentForm } from './my-component/component-form/component-form';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPokemonPipePipe } from './pipes/filter-pokemon--pipe-pipe';
import { provideHttpClient } from '@angular/common/http';
import { ConcertList } from './pages/concerts/concert-list/concert-list';
import { ConcertForm } from './pages/concerts/concert-form/concert-form';
import { UserList } from './pages/users/user-list/user-list';
import { UserDetails } from './pages/users/user-details/user-details';
import { UserForm } from './pages/users/user-form/user-form';
import { RouterModule } from '@angular/router';
import { Home } from './pages/home/home';
import { MatIconModule } from '@angular/material/icon';
import { ConcertCard } from './shared/concert-card/concert-card';
import { MatCardModule } from '@angular/material/card';
import { Navbar } from './shared/navbar/navbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConcertDetails } from './pages/concerts/concert-details/concert-details';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminConcerts } from './pages/admin/admin-concerts/admin-concerts';
import { OrganizerList } from './pages/organizers/organizer-list/organizer-list';
import { OrganizerDetails } from './pages/organizers/organizer-details/organizer-details';
import { OrganizerForm } from './pages/organizers/organizer-form/organizer-form';
import { PurchaseConfirmDialog } from './shared/purchase-confirm-dialog/purchase-confirm-dialog';
import { ArtistList } from './pages/artists/artist-list/artist-list';
import { ArtistDetails } from './pages/artists/artist-details/artist-details';
import { ArtistForm } from './pages/artists/artist-form/artist-form';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { Tickets } from './pages/tickets/tickets';
import { ConfirmActionDialogComponent } from './pages/tickets/confirm-action-dialog-component/confirm-action-dialog-component';
import { TransferDialogComponent } from './pages/tickets/transfer-dialog-component/transfer-dialog-component';
import { ConcertImagePipe } from './pipes/concert-image-pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminTickets } from './pages/admin/admin-tickets/admin-tickets';
registerLocaleData(localeFr);
const MATERIAL = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
];
@NgModule({
  declarations: [
    App,
    MyComponent,
    Artiste,
    ComponentForm,
    FilterPokemonPipePipe,
    ConcertList,
    ConcertDetails,
    ConcertForm,
    UserList,
    UserDetails,
    UserForm,
    Home,
    ConcertCard,
    Navbar,
    AdminDashboard,
    AdminConcerts,
    OrganizerList,
    OrganizerDetails,
    OrganizerForm,
    PurchaseConfirmDialog,
    ArtistList,
    ArtistDetails,
    ArtistForm,
    Tickets,
    ConfirmActionDialogComponent,
    TransferDialogComponent,
    AdminTickets,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ...MATERIAL,
    ConcertImagePipe,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [App],
})
export class AppModule {
  protected readonly name = signal('Mathieu');
}

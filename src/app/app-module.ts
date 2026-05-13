import { NgModule, provideBrowserGlobalErrorListeners, signal } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MyComponent } from './my-component/my-component';
import { Artiste } from './artiste/artiste';
import { ComponentForm } from './my-component/component-form/component-form';
import { FormsModule } from '@angular/forms';
import { FilterPokemonPipePipe } from './filter-pokemon--pipe-pipe';
import { provideHttpClient } from '@angular/common/http';
import { ConcertList } from './pages/concerts/concert-list/concert-list';
// import { ConcertDetails } from './pages/concerts/concert-details/concert-details';
import { ConcertForm } from './pages/concerts/concert-form/concert-form';
import { Concerts } from './pages/concerts/concerts';
import { UserList } from './pages/users/user-list/user-list';
import { UserDetails } from './pages/users/user-details/user-details';
import { UserForm } from './pages/users/user-form/user-form';
import { RouterModule } from '@angular/router';
import { Home } from './pages/home/home';
import { MatIconModule } from '@angular/material/icon';
import { ConcertCard } from './shared/concert-card/concert-card';
import { MatCardModule } from '@angular/material/card';
import { Navbar } from './shared/navbar/navbar';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
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
const MATERIAL = [
  MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSelectModule, MatSliderModule,
  MatSnackBarModule, MatTableModule, MatTabsModule, MatTooltipModule,
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
    Concerts,
    UserList,
    UserDetails,
    UserForm,
    Home,
    ConcertCard,
    Navbar,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
   ...MATERIAL
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {
  protected readonly name = signal('Mathieu');
}

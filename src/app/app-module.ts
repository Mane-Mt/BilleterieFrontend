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
import { ConcertList } from './concerts/concert-list/concert-list';
import { ConcertDetails } from './concerts/concert-details/concert-details';
import { ConcertForm } from './concerts/concert-form/concert-form';
import { Concerts } from './concerts/concerts';
import { Home } from './home/home';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ConcertCard } from './shared/concert-card/concert-card';
import { MatCard, MatCardModule } from '@angular/material/card';

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
    Home,
    ConcertCard,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserModule, MatIconModule, MatCardModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {
  protected readonly name = signal('Mathieu');
}

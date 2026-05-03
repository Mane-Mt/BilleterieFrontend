import { Component, inject } from '@angular/core';
import { Pokemon } from '../../pokemon';
import { PokeApiService } from '../../poke-api-service';

@Component({
  selector: 'app-component-form',
  standalone: false,
  templateUrl: './component-form.html',
  styleUrl: './component-form.css',
  providers:[PokeApiService]
})
export class ComponentForm {
  id: string = "";
  searchField : string = "";
  private pokeApiService = inject(PokeApiService);
  
  pokemons: Pokemon[] = [
    new Pokemon(1,  'Pikachu'),
      new Pokemon(4,  'Bulbizarre'),
      new Pokemon(7,  'Salamèche'),
      new Pokemon(25, 'Carapuce'),
      new Pokemon(54, 'Évoli'),
  ]

  IamClicke(){
    this.pokeApiService.getPokemonData(this.id).subscribe(data=>console.log(new Pokemon(data.id, data.name)))
  }
}

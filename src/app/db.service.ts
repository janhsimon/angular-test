import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { Game } from './game';

const baseURL: string = "https://jev8vvv1j7.execute-api.eu-west-1.amazonaws.com/test/games";

@Injectable({
  providedIn: 'root'
})
export class DBService {
  allGames!: Game[];
  filteredGamesUpdated = new EventEmitter<Game[]>();

  nameFilter: string | undefined = undefined;
  genres: string[] | undefined = undefined;
  platforms: string[] | undefined = undefined;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>(baseURL).subscribe((response) => {
      this.allGames = response as Game[];
      this.filteredGamesUpdated.emit(this.allGames);
    });
  }

  getGameById(id: number): Game | undefined {
    return this.allGames.find(game => game.id === id);
  }

  filterByName(name: string) {
    this.nameFilter = name.toLowerCase();
    this.updateFilter();
  }

  filterByGenre(genres: string[]) {
    this.genres = genres;
    this.updateFilter();
  }

  filterByPlatform(platforms: string[]) {
    this.platforms = platforms;
    this.updateFilter();
  }

  isGameInFilter(game: Game): boolean {
    const name = !this.nameFilter || game.title.toLowerCase().includes(this.nameFilter);
    const genre = !this.genres || this.genres?.length == 0 || this.genres?.includes(game.genre);

    let platforms = !this.platforms || this.platforms?.length == 0;
     if (!platforms) {
       for (let platform of game.platforms) {
         if (this.platforms?.includes(platform)) {
           platforms = true;
           break;
         }
       }
     }

    return name && genre && platforms;
  }

  updateFilter() {
    let filteredGames = this.allGames.filter(game => this.isGameInFilter(game));
    this.filteredGamesUpdated.emit(filteredGames);
  }
}

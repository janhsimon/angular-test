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

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>(baseURL).subscribe((response) => {
      this.allGames = response as Game[];
      this.filteredGamesUpdated.emit(this.allGames);
    });
  }

  getGameById(id: number): Game | undefined {
    return this.allGames.find(game => game.id === id);
  }

  filter(text: string) {
    if (!text) {
      this.filteredGamesUpdated.emit(this.allGames);
      return;
    }

    const filteredGames = this.allGames.filter(
      game => game?.title.toLowerCase().includes(text.toLowerCase())
    );
    this.filteredGamesUpdated.emit(filteredGames);
  }

  filterGenre(tags: string[]) {
    if (tags.length == 0) {
      this.filteredGamesUpdated.emit(this.allGames);
      return;
    }

    const filteredGames = this.allGames.filter(game => tags.includes(game?.genre));
    this.filteredGamesUpdated.emit(filteredGames);
  }

  filterPlatform(tags: string[]) {
    if (tags.length == 0) {
      this.filteredGamesUpdated.emit(this.allGames);
      return;
    }

    const filteredGames = this.allGames.filter(game => {
      for (let platform of game?.platforms) {
        if (tags.includes(platform)) {
          return true;
        }
      }
      return false;
    });

    this.filteredGamesUpdated.emit(filteredGames);
  }
}

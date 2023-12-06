import { EventEmitter, Injectable } from '@angular/core';

import { Game } from './game';

import db from '../db.json';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  allGames: Game[] = db.games;

  filteredGamesUpdated = new EventEmitter<Game[]>();

  filter(text: string){
    if (!text) {
      this.filteredGamesUpdated.emit(this.allGames);
      return;
    }

    const filteredGames = this.allGames.filter(
      game => game?.title.toLowerCase().includes(text.toLowerCase())
    );
    this.filteredGamesUpdated.emit(filteredGames);
  }
}

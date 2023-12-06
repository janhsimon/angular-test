import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { Game } from '../game';
import { DBService } from '../db.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [NgFor, ThumbnailComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  db: DBService = inject(DBService);
  games: Game[] = this.db.allGames;

  constructor() {
    this.db.filteredGamesUpdated.subscribe((filteredGames: Game[]) => {
      this.games = filteredGames;
    });
  }
}

import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from '../game';

import { DBService } from '../db.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements AfterViewInit {
  router = inject(Router);
  db: DBService = inject(DBService);
  route: ActivatedRoute;
  game: Game | undefined;
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  constructor(route: ActivatedRoute) {
    this.route = route;
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      const gameId = Number(params['game']);
      if (gameId >= 0) {
        this.game = this.db.getGameById(gameId);
        this.dialog.nativeElement.showModal();
      }
    });
  }

  closeDialog() {
    this.router.navigate(['/']);
  }
}
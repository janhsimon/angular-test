import { Component, ElementRef, inject, ViewChildren } from '@angular/core';

import { DBService } from '../db.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  db: DBService = inject(DBService);

  @ViewChildren('genre') genreCheckboxes!: ElementRef[];
  @ViewChildren('platform') platformCheckboxes!: ElementRef[];

  filterByGenre() {
    let genres: string[] = [];

    for (let checkbox of this.genreCheckboxes) {
      if (checkbox.nativeElement.checked) {
        genres.push(checkbox.nativeElement.id);
      }
    }

    this.db.filterByGenre(genres);
  }

  filterByPlatform() {
    let platforms: string[] = [];

    for (let checkbox of this.platformCheckboxes) {
      if (checkbox.nativeElement.checked) {
        platforms.push(checkbox.nativeElement.id);
      }
    }

    this.db.filterByPlatform(platforms);
  }
}

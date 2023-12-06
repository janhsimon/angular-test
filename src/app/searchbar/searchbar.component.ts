import { Component, inject } from '@angular/core';

import { DBService } from '../db.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  db: DBService = inject(DBService);

  filter(text: string) {
    this.db.filter(text);
  }
}

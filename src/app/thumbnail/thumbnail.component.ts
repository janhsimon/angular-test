import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Game } from '../game';

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.css'
})
export class ThumbnailComponent {
  @Input() game!: Game;
  @ViewChild('img') img!: ElementRef;

  enter() {
    if (!this.img) { return; }

    this.img.nativeElement.style.width = "120%";
    this.img.nativeElement.style.height = "120%";
  }

  leave() {
    if (!this.img) { return; }

    this.img.nativeElement.style.width = "100%";
    this.img.nativeElement.style.height = "100%";
  }
}

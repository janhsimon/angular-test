import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Game } from '../game';

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.css'
})
export class ThumbnailComponent {
  @Input() game!: Game;
  @ViewChild('img') img!: ElementRef;

  enter() {
    this.img.nativeElement.style.width = "120%";
    this.img.nativeElement.style.height = "120%";
  }

  leave() {
    this.img.nativeElement.style.width = "100%";
    this.img.nativeElement.style.height = "100%";
  }
}

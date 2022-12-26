import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-row',
  templateUrl: './movie-row.component.html',
  styleUrls: ['./movie-row.component.css'],
})
export class MovieRowComponent {
  @Input() title!: any;
  @Input() items!: any;
  constructor() {}

  scrollX: number = -400;

  handleLeftArrow = () => {
    let x = this.scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    this.scrollX = x;
  };

  handleRightArrow = () => {
    let x = this.scrollX - Math.round(window.innerWidth / 2);
    let listW = this.items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    this.scrollX = x;
  };

  ngOnInit() {}
}

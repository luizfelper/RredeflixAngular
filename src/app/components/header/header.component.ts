import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() black!: boolean;
  backHeader: boolean = false;

  constructor(){}

  scrollListener = () => {
    if(window.scrollY > 10) {
      this.backHeader = true;
      console.log(this.backHeader);
    } else {
      this.backHeader = false;
      console.log(this.backHeader);
    }
  };

  ngOnInit() {
    this.scrollListener();
    window.addEventListener('scroll', this.scrollListener);
    return () => {
      window.removeEventListener('scroll', this.scrollListener);
    }
  };

}

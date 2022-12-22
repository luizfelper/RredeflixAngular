import { Component } from '@angular/core';
import {FilmesService} from "../../../services/filmes.service";
import { Filmes } from 'src/app/Filmes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featureData: any = {};

  constructor(private filmesService: FilmesService) { }

  async loadlAll() {
    let list = await this.filmesService.getHomeList();
    // Pegando o Filme em Destque e mostra na tela!!!
    let originals: any = list.filter((i: any)=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await this.filmesService.getMovieInfo(chosen.id, 'tv');
    this.featureData = chosenInfo;
  };

  ngOnInit() {
    this.loadlAll();
  }

}

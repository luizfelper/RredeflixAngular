import { Component } from '@angular/core';
import {FilmesService} from "../../../services/filmes.service";
import { Filmes } from 'src/app/Filmes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featureData: Filmes = {} as Filmes;
  genres: string[] = [];
  description: string = '';
  movieList: any[] = [];
  firstDate: any;

  constructor(private filmesService: FilmesService) { }

  async loadlAll() {
    let list = await this.filmesService.getHomeList();
    this.movieList = await this.filmesService.getHomeList();
    // Pegando o Filme em Destque e mostra na tela!!!
    let originals: any = list.filter((i: any)=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await this.filmesService.getMovieInfo(chosen.id, 'tv');
    this.featureData = chosenInfo;
    this.firstDate = new Date(chosenInfo.first_air_date);
    
    if (chosenInfo.overview.length > 200) {
      this.description = chosenInfo.overview.substring(0, 200) + '...';
    } else {
      this.description = chosenInfo.overview;
    }

    for(let i in chosenInfo.genres) {
      this.genres.push(chosenInfo.genres[i].name)
    }
  };

  ngOnInit() {
    this.loadlAll();
  }

}
 
import { Component } from '@angular/core';
import { environment } from 'environments/environments';
import {Filmes} from "../../../Filmes"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() {}

  private baseApiUrl: string = environment.baseApiUrl;
  private apiKey: string = environment.apiKey;

  private Idioma: string = environment.Idioma;
  private OriginaisNetflix: string = environment.Idioma;
  private generoAcao: string = environment.Idioma;
  private generoComedia: string = environment.Idioma;
  private generoTerror: string = environment.Idioma;
  private generoRomance: string = environment.Idioma;
  private Documentarios: string = environment.Idioma;

  featureData: any = {};

  async basicFetch(endpoint: string) {
    const request = await fetch(`${this.baseApiUrl}${endpoint}`);
    const json = await request.json();
    return json;
  }

  async getHomeList() {
    return [
      {
          slug: 'originals',
          title: 'Originais do Netflix',
          items: await this.basicFetch(`/discover/tv?${this.OriginaisNetflix}&${this.Idioma}&api_key=${this.apiKey}`)
      },
      {
          slug: 'trending',
          title: 'Recomendados para você',
          items: await this.basicFetch(`/trending/all/week?${this.Idioma}&api_key=${this.apiKey}`)
      },
      {
          slug: 'toprated',
          title: 'Em Alta',
          items: await this.basicFetch(`/movie/top_rated?${this.Idioma}&api_key=${this.apiKey}`)
      },
      {
          slug: 'action',
          title: 'Ação',
          items: await this.basicFetch(`/discover/movie?${this.generoAcao}&${this.Idioma}&api_key=${this.apiKey}`)
      },            {
          slug: 'comedy',
          title: 'Comédia',
          items: await this.basicFetch(`/discover/movie?${this.generoComedia}&${this.Idioma}&api_key=${this.apiKey}`)
      },            {
          slug: 'horror',
          title: 'Terror',
          items: await this.basicFetch(`/discover/movie?${this.generoTerror}&${this.Idioma}&api_key=${this.apiKey}`)
      },            {
          slug: 'romance',
          title: 'Romance',
          items: await this.basicFetch(`/discover/movie?${this.generoRomance}&${this.Idioma}&api_key=${this.apiKey}`)
      },            {
          slug: 'documentary',
          title: 'Documentários',
          items: await this.basicFetch(`/discover/movie?${this.Documentarios}&${this.Idioma}&api_key=${this.apiKey}`)
      },
  ];
  }

  async getMovieInfo(movieId: number, type: string) {
          let info: any = {};
            if(movieId){
                switch(type){
                    case 'movie':
                        info = await this.basicFetch(`/movie/${movieId}?${this.Idioma}&api_key=${this.apiKey}`);
                        break;
                        case 'tv':
                            info = await this.basicFetch(`/tv/${movieId}?${this.Idioma}&api_key=${this.apiKey}`);
                        break;
                        default:
                            info = null;
                        break;
                }
            }
        return info;
  }

  ngOnInit() {
    const loadlAll = async () => {
      let list = await this.getHomeList();

       // Pegando o Filme em Destque e mostra na tela!!!
       let originals = list.filter(i=>i.slug === 'originals');
       let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
       let chosen = originals[0].items.results[randomChosen];
       let chosenInfo = await this.getMovieInfo(chosen.id, 'tv');
       this.featureData = chosenInfo;
       console.log(chosenInfo);
    }
    loadlAll();
    console.log(this.featureData);
  }


}

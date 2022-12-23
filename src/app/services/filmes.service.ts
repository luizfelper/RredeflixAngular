import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environments';
import { lastValueFrom, Observable } from 'rxjs';
import { Filmes, itemsHomeList, totalItems } from 'src/app/Filmes';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) {}

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

  
//   async basicFetch(endpoint: string) {
//     const request = await this.http.get(`${this.baseApiUrl}${endpoint}`);
//     return request;
//   }

  async basicFetch(endpoint?: string): Promise<Object> {
    const request = await this.http.get(`${this.baseApiUrl}${endpoint}`);
    return await lastValueFrom(request);
  }


  
  async getHomeList(): Promise<itemsHomeList[]> {
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

}

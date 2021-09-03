import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  /* Permite que los servicios esten disponibles en todo lados, no necesario providers. */
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'agDY029uZRprElwA5Dmgy5Io82LbO9zE';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){}

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes(query) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=agDY029uZRprElwA5Dmgy5Io82LbO9zE&q=${ query }&limit=10`)
    .subscribe(( resp: SearchGifsResponse) =>{
      this.resultados =  resp.data;
    },
    error =>{
      console.log(error);
    });
    
  }
}

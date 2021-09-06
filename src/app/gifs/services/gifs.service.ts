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

  constructor( private http: HttpClient ) {

    /* Equivalente al if. */
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];

    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || []


/*     if ( localStorage.getItem('historial') ) {
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    } */

  }

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes(query) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );

    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=agDY029uZRprElwA5Dmgy5Io82LbO9zE&q=${ query }&limit=10`)
    .subscribe(( resp: SearchGifsResponse) =>{
      this.resultados =  resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados) );
    },
    error =>{
      console.log(error);
    });
    
  }
}

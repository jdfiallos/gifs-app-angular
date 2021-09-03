import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  constructor( private gifService: GifsService ) { }

  /* El get lo esta obteniendo en tiempo real */
  get resultados() {
    return this.gifService.resultados;
  }

}

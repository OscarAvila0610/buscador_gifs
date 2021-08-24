import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent{

    get historial(){
      return this.gifsService.historial;
    }

    constructor(private gifsService: GifsService){}//siempre declarar el servicio en el constructor para poder recuperar datos
    
    buscar(termino: string){
      this.gifsService.buscarGifs(termino);
    }
}

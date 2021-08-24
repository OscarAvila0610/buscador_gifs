import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '40zCaWTJsNWlNmpgCv4fmJtHpMXhstcN';
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){//Solo es client, no clientmodule

      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('ultima_busqueda')!) || []
      // if(localStorage.getItem('historial')){
      //   this._historial = JSON.parse(localStorage.getItem('historial')!);
      // }
  }

  buscarGifs(query:string = ''){

    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)){//Validamos si existe lo que estamos buscando con includes
      this._historial.unshift(query);//si no lo incluye va a incluirlo en el arreglo y por lo tanto cortara los 10 elementos
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));//Con esto mantenemos la informacion del local storage y se usa json para convertir un arreglo en string
    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
        .subscribe((resp) =>{
          this.resultados = resp.data;
          localStorage.setItem('ultima_busqueda', JSON.stringify(this.resultados));
        });

  }
}

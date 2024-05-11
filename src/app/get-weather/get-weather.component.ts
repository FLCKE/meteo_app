import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-get-weather',
  templateUrl: './get-weather.component.html',
  styleUrl: './get-weather.component.css'
})
export class GetWeatherComponent {
  constructor (private clientHttp : HttpClient){

  }
   public getWeather(insee: string) {
      let getUrl = `https://api.meteo-concept.com/api/forecast/daily?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;
      this.clientHttp.get(getUrl).subscribe(result => {
        console.log(result);
      });
    }
}

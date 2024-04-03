import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityComponent } from '../model/model.city.component';
import { PrevisionWeekComponent } from '../model/model.prevision.component';
import { PrevisionDayComponent } from '../model/model.prevision.component';
import { PrevisionDayByHourComponent } from '../model/model.prevision.component';
import { DatePipe } from '@angular/common';
import { WEATHER } from '../model/model.weather';
@Component({
  selector: 'app-api-req',
  templateUrl: './api-req.component.html',
  styleUrl: './api-req.component.css'
})
export class ApiReqComponent implements OnInit {
  public weekPrevision !: PrevisionWeekComponent;
  public dayPrevision !: PrevisionDayComponent;
  public dayByHourPrevision !: PrevisionDayByHourComponent;
  public cityname="";
  public weather=WEATHER;
  constructor(private clientHttp: HttpClient, public datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.getInsee();
    if (this.weekPrevision) {
      console.log(this.weekPrevision.city);
    }

  }
  /**
   * get_weather
   */
  public getWeatherOfWeek(insee: string) {
    let getUrl = `https://api.meteo-concept.com/api/forecast/daily?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;

    this.clientHttp.get<PrevisionWeekComponent>(getUrl).subscribe(result => {
      this.weekPrevision = result;
      console.log(this.weekPrevision);
    });
  }
  public getWeatherOfDayByHour(insee: string) {
    let getUrl = `https://api.meteo-concept.com/api/forecast/nextHours?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;

    this.clientHttp.get<PrevisionDayByHourComponent>(getUrl).subscribe(result => {
      this.dayByHourPrevision = result;
      console.log(this.dayByHourPrevision);
    });
  }
  public getWeatherOfDay(insee: string) {
    let getUrl = `https://api.meteo-concept.com/api/forecast/daily/0?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;

    this.clientHttp.get<PrevisionDayComponent>(getUrl).subscribe(result => {
      this.dayPrevision = result;
      console.log(this.dayPrevision.forecast);
    });
  }
  public getInsee() {
    this.getPosition().then((pos: any) => {
      let getUrl = `https://api.meteo-concept.com/api/location/city?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&latlng=${pos.lat},${pos.lng}`;

      let result = this.clientHttp.get<CityComponent>(getUrl).subscribe(result => {
        console.log(result.city.name);
        this.cityname=result.city.name;
        this.getWeatherOfWeek(result.city.insee);
        this.getWeatherOfDay(result.city.insee);
        this.getWeatherOfDayByHour(result.city.insee);
      });
      // console.log(`Positon: ${pos.lng} ${pos.lat} ${pos.acc} `);
    });

  }
  public getPosition() {
    var options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0,
    };

    return new Promise((resolve, reject) => {
      if (typeof navigator !== 'undefined') {

        if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(resp => {

            resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude, acc: resp.coords.accuracy, });
          },
            err => {
              reject(err);
            }, options);
        }
      }
    });
  }
}

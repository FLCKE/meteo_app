import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityComponent, CityComponent2, cities } from '../model/model.city.component';
import { PrevisionWeekComponent } from '../model/model.prevision.component';
import { PrevisionDayComponent } from '../model/model.prevision.component';
import { PrevisionDayByHourComponent } from '../model/model.prevision.component';
import { DatePipe } from '@angular/common';
import { WEATHER } from '../model/model.weather';
import { Observable } from 'rxjs';
import { SearchBarreComponent } from '../search-barre/search-barre.component';
@Component({
  selector: 'app-api-req',
  templateUrl: './api-req.component.html',
  styleUrl: './api-req.component.css'
})
export class ApiReqComponent implements OnInit {
  public weekPrevision: PrevisionWeekComponent | null = null;
  public dayPrevision: PrevisionDayComponent | null = null;
  public dayByHourPrevision: PrevisionDayByHourComponent | null = null;
  public cityname = "";
  public weather = WEATHER;
  public insee: string = "0";

  constructor(private clientHttp: HttpClient, public datePipe: DatePipe) {
  }
  ngOnInit(): void {

    if (this.insee == "0") {
      this.getInsee();
    }

  }

  /**
   * get_weather
   */
  public getWeatherOfWeek(insee: string): Observable<PrevisionWeekComponent> {
    let getUrl = `https://api.meteo-concept.com/api/forecast/daily?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;

    return this.clientHttp.get<PrevisionWeekComponent>(getUrl);
  }
  public getWeatherOfDayByHour(insee: string): Observable<PrevisionDayByHourComponent> {
    let getUrl = `https://api.meteo-concept.com/api/forecast/nextHours?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;

    return this.clientHttp.get<PrevisionDayByHourComponent>(getUrl);
  }
  public getWeatherOfDay(insee: string): Observable<PrevisionDayComponent> {
    let getUrl = `https://api.meteo-concept.com/api/forecast/daily/0?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;

    // return this.clientHttp.get<PrevisionDayComponent>(getUrl).subscribe(result => {
    //   this.dayPrevision = result;
    //   // console.log(this.dayPrevision.forecast);


    // });
    return this.clientHttp.get<PrevisionDayComponent>(getUrl);
  }
  public getInsee() {
    this.getPosition().then((pos: any) => {
      let getUrl = `https://geo.api.gouv.fr/communes?lat=${pos.lat}&lon=${pos.lng}&fields=code`;

      this.clientHttp.get<cities[]>(getUrl).subscribe(result => {
        var city: cities[] = result;
        // console.log(city[0].code);
        this.getweather(city[0].code);
      });
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

            resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
          },
            err => {
              reject(err);
            }, options);
        }
      }
    });
  }
  /**
   * getweather
   */
  public getweather(insee: string) {
    this.getWeatherOfWeek(insee).subscribe((result) => {
      this.weekPrevision = result;
    });
    this.getWeatherOfDay(insee).subscribe((result) => {
      this.dayPrevision = result;
    });
    this.getWeatherOfDayByHour(insee).subscribe((result) => {
      this.dayByHourPrevision = result;
    });
  }
  /**
   * receve
  */
  public receve(insee: string) {
    this.dayPrevision = null;
    this.dayByHourPrevision = null;
    this.weekPrevision = null;
    this.getweather(insee);

  }
}

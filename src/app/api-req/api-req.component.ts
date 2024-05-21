import { Component, OnInit } from '@angular/core';
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
  // Déclaration des variables publiques
  public weekPrevision: PrevisionWeekComponent | null = null;
  public dayPrevision: PrevisionDayComponent | null = null;
  public dayByHourPrevision: PrevisionDayByHourComponent | null = null;
  public cityname = "";
  public weather = WEATHER;
  public insee: string = "0";

  // Constructeur avec injection des services HttpClient et DatePipe
  constructor(private clientHttp: HttpClient, public datePipe: DatePipe) {
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    if (this.insee == "0") {
      this.getInsee(); // Obtient le code INSEE si non défini
    }
  }

  /**
   * Méthode pour obtenir les prévisions météo de la semaine
   */
  public getWeatherOfWeek(insee: string): Observable<PrevisionWeekComponent> {
    let getUrl = `https://api.meteo-concept.com/api/forecast/daily?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;
    return this.clientHttp.get<PrevisionWeekComponent>(getUrl);
  }

  /**
   * Méthode pour obtenir les prévisions météo heure par heure de la journée
   */
  public getWeatherOfDayByHour(insee: string): Observable<PrevisionDayByHourComponent> {
    let getUrl = `https://api.meteo-concept.com/api/forecast/nextHours?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;
    return this.clientHttp.get<PrevisionDayByHourComponent>(getUrl);
  }

  /**
   * Méthode pour obtenir les prévisions météo de la journée
   */
  public getWeatherOfDay(insee: string): Observable<PrevisionDayComponent> {
    let getUrl = `https://api.meteo-concept.com/api/forecast/daily/0?token=e333e524e5cbea313aae8d366dd00057cd40afa0aa967498a87ef7e728988ee9&insee=${insee}`;
    return this.clientHttp.get<PrevisionDayComponent>(getUrl);
  }

  /**
   * Méthode pour obtenir le code INSEE de la position actuelle
   */
  public getInsee() {
    this.getPosition().then((pos: any) => {
      let getUrl = `https://geo.api.gouv.fr/communes?lat=${pos.lat}&lon=${pos.lng}&fields=code`;
      this.clientHttp.get<cities[]>(getUrl).subscribe(result => {
        var city: cities[] = result;
        this.getweather(city[0].code); // Obtient les prévisions météo avec le code INSEE obtenu
      });
    });
  }

  /**
   * Méthode pour obtenir la position géographique actuelle
   */
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
   * Méthode pour obtenir les prévisions météo complètes
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
   * Méthode pour recevoir les prévisions météo
   */
  public receve(insee: string) {
    this.dayPrevision = null;
    this.dayByHourPrevision = null;
    this.weekPrevision = null;
    this.getweather(insee); // Actualise les prévisions météo avec le nouveau code INSEE
  }
}

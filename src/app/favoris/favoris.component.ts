import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityByNameItemComponent } from '../model/model.citybyname.component';
import { BackendService } from '../back_api/backend.service';
import { ApiReqComponent } from '../api-req/api-req.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.css'
})
export class FavorisComponent implements OnInit {
  constructor(private http: HttpClient, private back: BackendService, private datepipe: DatePipe, private router: Router) { }

  CityData: CityByNameItemComponent[] = []; // Stocke les données des villes recherchées
  fav: any; // Stocke les favoris de l'utilisateur
  public api: ApiReqComponent = new ApiReqComponent(this.http, this.datepipe); // Instance du composant ApiReqComponent
  cityPredict: any[] = [null, null, null]; // Prévisions météo pour les villes favorites
  datas: any; // Stocke les données de l'utilisateur
  stateName: string = ""; // Nom de l'état ou de la ville
  index: number = 0; // Index pour les favoris
  public stateInsee: String = "xxxxx"; // Code INSEE de la ville

  ngOnInit(): void {
    this.getUserData(); // Récupère les données de l'utilisateur
    this.back.selectFav(this.datas.user_id).subscribe((result) => {
      this.fav = result; // Récupère les favoris de l'utilisateur
      console.log(this.fav.data[0]);

      for (let i = 0; i < 3; i++) {
        console.log(this.fav.data[0]["cp" + i]);
        if (this.fav.data[0]["cp" + i] == null) {
          this.cityPredict[i] = null;
        } else {
          this.api.getWeatherOfDay(this.fav.data[0]["cp" + i]).subscribe((result) => {
            this.cityPredict[i] = result; // Stocke les prévisions météo pour chaque ville favorite
          });
        }
      }
      console.log(this.cityPredict);
    });
  }

  /**
   * Récupère les données de l'utilisateur depuis le localStorage
   */
  public getUserData() {
    if (typeof localStorage != 'undefined') {
      this.datas = localStorage.getItem("AuthUser");
      this.datas = JSON.parse(this.datas);
    }
  }

  /**
   * Définit l'index pour les favoris
   */
  public set_index(x: number) {
    this.index = x;
  }

  /**
   * Récupère les données des villes par nom
   */
  public getDataByCityName(name: any) {
    let reqUrl = `https://geo.api.gouv.fr/communes?nom=${name}&fields=departement&boost=population&limit=10`;
    this.http.get<CityByNameItemComponent[]>(reqUrl).subscribe(result => {
      this.CityData = result; // Stocke les données des villes recherchées
      console.log(this.CityData);
    });
  }

  /**
   * Définit le code INSEE de la ville sélectionnée
   */
  public setInsee(code: any) {
    console.log("Code INSEE défini : ", code);
    this.stateInsee = code;
    console.log(this.stateInsee);
  }

  /**
   * Ajoute une ville aux favoris
   */
  public addFav(cp_id: number) {
    let data: any;
    console.log(cp_id);
    let city = document.getElementById('exampleDataList') as HTMLInputElement;
    let cp = document.getElementById('streetCode') as HTMLInputElement;

    console.log(cp.value);
    data = {
      state: city.value,
      code: cp.value,
      user_Id: this.datas.user_id,
    };

    console.log(data);
    this.back.addState(data, cp_id).subscribe((next) => {
      console.log("Ville ajoutée avec succès aux favoris");
      window.location.reload();
      this.router.navigateByUrl('/favoris');
    });
  }

  /**
   * Récupère le code INSEE de l'état ou de la ville par nom
   */
  public getInseeOfState(name: string) {
    let url = 'https://geo.api.gouv.fr/communes?nom=' + name + '&fields=departement&boost=population&limit=1';
    this.http.get<CityByNameItemComponent[]>(url).subscribe((next) => {
      this.stateInsee = next[0].code; // Stocke le code INSEE de la ville recherchée
    });
  }
}

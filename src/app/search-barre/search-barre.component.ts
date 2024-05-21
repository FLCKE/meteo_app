import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityByNameItemComponent } from '../model/model.citybyname.component'; // Import du modèle CityByNameItemComponent
import { ApiReqComponent } from '../api-req/api-req.component'; // Import du composant ApiReqComponent

@Component({
  selector: 'app-search-barre',
  templateUrl: './search-barre.component.html',
  styleUrls: ['./search-barre.component.css']
})
export class SearchBarreComponent {
  @Output() messageEnvoye = new EventEmitter<string>(); // Événement de sortie pour envoyer un message (ici, l'Insee de la ville)

  constructor(private http: HttpClient, private apiReq: ApiReqComponent) { } // Injection de HttpClient et de ApiReqComponent

  CityData: CityByNameItemComponent[] = []; // Tableau pour stocker les données des villes trouvées
  stateName: string = ""; // Variable pour stocker le nom de la ville entrée par l'utilisateur
  public stateInsee: string = "*****"; // Variable pour stocker le code Insee de la ville sélectionnée (initialisée à *****)

  /**
   * Méthode pour récupérer les données des villes par leur nom depuis une API externe
   * @param name Nom de la ville entré par l'utilisateur
   */
  public getDataByCityName(name: any) {
    let reqUrl = `https://geo.api.gouv.fr/communes?nom=${name}&fields=departement&boost=population&limit=10`;
    this.http.get<CityByNameItemComponent[]>(reqUrl).subscribe(result => {
      this.CityData = result; // Stockage des résultats dans CityData
      this.setInsee(this.CityData); // Appel de setInsee pour définir le code Insee
      console.log(this.CityData);
    });
  }

  /**
   * Méthode pour définir le code Insee d'une ville
   * @param code Code Insee de la ville
   */
  public setInsee(code: any) {
    this.stateInsee = code; // Définition du code Insee
  }

  /**
   * Méthode pour obtenir le code Insee d'une ville à partir de son nom
   * @param name Nom de la ville
   */
  public getInseeOfState(name: string) {
    let url = 'https://geo.api.gouv.fr/communes?nom=' + name + '&fields=departement&boost=population&limit=1';
    this.http.get<CityByNameItemComponent[]>(url).subscribe((next) => {
      this.stateInsee = next[0].code; // Récupération du premier code Insee trouvé
      console.log(this.stateInsee);
    });
  }

  /**
   * Méthode pour déclencher la recherche météo en émettant le code Insee de la ville sélectionnée
   */
  public search_weather() {
    this.messageEnvoye.emit(this.stateInsee); // Émission du code Insee via l'événement messageEnvoye
  }

}

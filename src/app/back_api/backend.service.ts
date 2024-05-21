import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Décoration du service pour qu'il soit disponible dans l'injecteur racine
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // Injection du service HttpClient dans le constructeur
  constructor(private _http: HttpClient) { }

  // Variable pour stocker l'URL de l'API
  public apiUrl!: string;

  // Méthode pour obtenir un utilisateur en utilisant une URL spécifiée
  getUser(link: string): Observable<any> {
    return this._http.get(`${link}`);
  }

  // Méthode pour obtenir un utilisateur par son ID en utilisant une URL spécifiée
  getUserById(link: string): Observable<any> {
    return this._http.get(`${link}`);
  }

  // Méthode pour ajouter un nouvel utilisateur en envoyant une requête POST à l'API
  addUser(newUser: any): Observable<any> {
    this.apiUrl = 'http://localhost:3306/add-user';
    return this._http.post(this.apiUrl, newUser);
  }

  // Méthode pour mettre à jour un utilisateur existant en envoyant une requête POST à l'API
  updateUser(newUser: any, user_id: Number): Observable<any> {
    this.apiUrl = 'http://localhost:3306/update-user?user_id=' + user_id;
    return this._http.post(this.apiUrl, newUser);
  }

  // Méthode pour déconnecter l'utilisateur en supprimant ses informations d'authentification du localStorage
  logout() {
    localStorage.removeItem("AuthUser");
  }

  // Méthode pour ajouter un état favori en envoyant une requête POST à l'API
  addState(newFav: any, cp_id: number): Observable<any> {
    this.apiUrl = 'http://localhost:3306/add_state?cp_id=' + cp_id;
    console.log(newFav);
    return this._http.post(this.apiUrl, newFav);
  }

  // Méthode pour sélectionner les favoris d'un utilisateur en envoyant une requête GET à l'API
  selectFav(user_id: any): Observable<any> {
    let link = 'http://localhost:3306/select_fav?user_id=' + user_id;
    console.log(user_id);
    return this._http.get(link);
  }
}

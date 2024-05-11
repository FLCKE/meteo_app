import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private _http: HttpClient) { }
  public apiUrl!: string;
  getUser(link: string): Observable<any> {
    return this._http.get(`${link}`);
  }
  getUserById(link: string): Observable<any> {
    return this._http.get(`${link}`);
  }
  // public 
  addUser(newUser: any): Observable<any> {
    this.apiUrl = 'http://localhost:3306/add-user';
    return this._http.post(this.apiUrl, newUser);
  }
  updateUser(newUser: any, user_id: Number): Observable<any> {
    this.apiUrl = 'http://localhost:3306/update-user?user_id=' + user_id;
    return this._http.post(this.apiUrl, newUser);
  }
  logout() {
    localStorage.removeItem("AuthUser");
  }
  /**
   * addfile
   */
  addState(newFav: any, cp_id: number): Observable<any> {
    this.apiUrl = 'http://localhost:3306/add_state?cp_id=' + cp_id;
    console.log(newFav);
    return this._http.post(this.apiUrl, newFav);
  }
  selectFav(user_id: any): Observable<any> {
    let link = 'http://localhost:3306/select_fav?user_id=' + user_id;
    console.log(user_id);
    return this._http.get(link);
  }
}


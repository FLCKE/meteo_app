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
  constructor(private http: HttpClient, private back: BackendService, private datepipe: DatePipe, private router:Router) { }
  CityData: CityByNameItemComponent[] = [];
  fav: any;
  public api: ApiReqComponent = new ApiReqComponent(this.http, this.datepipe);
  cityPredict: any[] = [null, null, null];
  datas: any;
  stateName: string = "";
  index: number = 0;
  public stateInsee: String = "xxxxx";
  ngOnInit(): void {
    this.getUserData();
    this.back.selectFav(this.datas.user_id).subscribe((result) => {
      this.fav = result;
      // let i = 0;
      console.log(this.fav.data[0]);
      for (let i = 0; i < 3; i++) {

        console.log(this.fav.data[0]["cp" + i]);
        if (this.fav.data[0]["cp" + i] == null) {
          this.cityPredict[i] = null;
          // i++     
        } else {
          this.api.getWeatherOfDay(this.fav.data[0]["cp" + i]).subscribe((result) => {
            this.cityPredict[i] = result;
            // i++;
          });
        }
        // Pour eviter les probléme de placement des information 


      }
      console.log(this.cityPredict);
      //j'etais bloqué ici a caused'une mauvaise indexation des element du tableau donc a revoir une fois a la maison 
      // j'arrive a ajouté a la base de donnée mais au mauvais endroit

      // console.log(this.cityPredict[1].city.insee);
      // console.log(this.cityPredict[2].city.insee);
    })
  }
  public getUserData() {
    if (typeof localStorage != 'undefined') {

      this.datas = localStorage.getItem("AuthUser");
      this.datas = JSON.parse(this.datas);
    }
  }
  /**
   * set_index
   */
  public set_index(x: number) {
    this.index = x;
  }
  /**
   * getDataByCityName
  */
  public getDataByCityName(name: any) {
    let reqUrl = `https://geo.api.gouv.fr/communes?nom=${name}&fields=departement&boost=population&limit=10`;
    this.http.get<CityByNameItemComponent[]>(reqUrl).subscribe(result => {
      this.CityData = result;
      console.log(this.CityData);
    })

  }
  /**
   * setInsee
 code : number  */
  public setInsee(code: any) {
    console.log("fffffffffffff");
    this.stateInsee = code;
    console.log(this.stateInsee);
  }

  /**
   * addFav
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
    }


    console.log(data);
    this.back.addState(data, cp_id).subscribe((next) => {
      console.log("success city added");
      window.location.reload();
      this.router.navigateByUrl('/favoris');
      
    })
  }
  /**
   * getInseeOfState
   */
  public getInseeOfState(name: string) {

    let url = 'https://geo.api.gouv.fr/communes?nom=' + name + '&fields=departement&boost=population&limit=1'
    this.http.get<CityByNameItemComponent[]>(url).subscribe((next) => {
      this.stateInsee = next[0].code;
    });

  }
}

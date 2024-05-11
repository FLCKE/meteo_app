import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityByNameItemComponent } from '../model/model.citybyname.component';
import { ApiReqComponent } from '../api-req/api-req.component';

@Component({
  selector: 'app-search-barre',
  templateUrl: './search-barre.component.html',
  styleUrl: './search-barre.component.css'
})
export class SearchBarreComponent  {
  @Output() messageEnvoye = new EventEmitter<string>();
  constructor(private http: HttpClient,private apiReq:ApiReqComponent) { }
  CityData: CityByNameItemComponent[] = [];
  
  stateName: string = "";
  public stateInsee:  string="*****";
  

  /**
   * getDataByCityName
  */
  public getDataByCityName(name: any) {
    let reqUrl = `https://geo.api.gouv.fr/communes?nom=${name}&fields=departement&boost=population&limit=10`;
    this.http.get<CityByNameItemComponent[]>(reqUrl).subscribe(result => {
      this.CityData = result;
      this.setInsee(this.CityData)
      console.log(this.CityData);
    })

  }
  /**
   * setInsee
 code : number  */
  public setInsee(code: any) {
    this.stateInsee = code;
  }
  public getInseeOfState(name: string) {
    let url = 'https://geo.api.gouv.fr/communes?nom=' + name + '&fields=departement&boost=population&limit=1'
    this.http.get<CityByNameItemComponent[]>(url).subscribe((next) => {
      this.stateInsee = next[0].code;
      console.log(this.stateInsee);
    });
    
  }
  /**
   *  search_weather
  
  */
 public  search_weather() {
   
   this.messageEnvoye.emit(this.stateInsee);
    
  }

}

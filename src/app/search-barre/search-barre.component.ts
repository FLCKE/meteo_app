import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityByNameItemComponent } from '../model/model.citybyname.component';


@Component({
  selector: 'app-search-barre',
  templateUrl: './search-barre.component.html',
  styleUrl: './search-barre.component.css'
})
export class SearchBarreComponent implements OnInit {
  constructor(private http: HttpClient) { }
  CityData: CityByNameItemComponent[] = [];

  stateName: string = "";
  stateInsee: number = 0;
  ngOnInit(): void {
    // var stateName:HTMLElement|null =document.getElementById("stateName");

    // this.getDataByCityName(stateName);
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

}

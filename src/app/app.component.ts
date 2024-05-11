import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'meteo_app';
  data: any;
  public getUserData() {
    if ( typeof localStorage != 'undefined') {

      this.data = localStorage.getItem("AuthUser");
    }
  }
  ngOnInit(): void {
    this.getUserData();
  }
}

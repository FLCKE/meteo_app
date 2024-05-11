import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  data: any;
  constructor() { }
  ngOnInit(): void {
    this.auth();
  }
  auth() {
    if (typeof localStorage != 'undefined') {

      this.data = localStorage.getItem("AuthUser");
    }
  }
}

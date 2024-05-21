import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // styleUrl corrigé en styleUrls
})
export class NavbarComponent implements OnInit {

  data: any;  // Variable pour stocker les données de l'utilisateur authentifié

  constructor() { }

  ngOnInit(): void {
    this.auth();  // Appel de la méthode auth lors de l'initialisation du composant
  }

  auth() {
    if (typeof localStorage !== 'undefined') {
      // Vérifie si localStorage est pris en charge par le navigateur
      this.data = localStorage.getItem("AuthUser");  // Récupère les données d'authentification de l'utilisateur depuis localStorage
    }
  }
}

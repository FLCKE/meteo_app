import { Component, OnInit } from '@angular/core';
import { BackendService } from '../back_api/backend.service';  // Import du service backend
import { Router } from '@angular/router';  // Import du routeur Angular

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']  // styleUrl corrigé en styleUrls
})
export class ProfilComponent implements OnInit {

  public userData: any;  // Variable pour stocker les données de l'utilisateur

  constructor(private apiservice: BackendService, private router: Router) { }

  /**
   * Méthode pour récupérer les données de l'utilisateur depuis localStorage
   */
  public getUserData() {
    const data = localStorage.getItem('AuthUser');
    if (typeof localStorage !== 'undefined') {
      this.userData = localStorage.getItem("AuthUser");
      this.userData = JSON.parse(this.userData);  // Conversion de la chaîne JSON en objet JavaScript
    }
    console.log("eeeeeeeee");
    if (this.userData) {
      console.log(this.userData);
    }
  }

  /**
   * Méthode pour déconnecter l'utilisateur en supprimant les données d'authentification de localStorage
   * et en rechargeant la page
   */
  public logout() {
    localStorage.removeItem("AuthUser");
    window.location.reload();  // Recharge la page pour effectuer la déconnexion
  }

  /**
   * Méthode pour mettre à jour les informations de l'utilisateur
   */
  public updateUser() {
    let email = document.getElementById('email') as HTMLInputElement;
    let username = document.getElementById('user_name') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;

    const newUserData = {
      user_email: email.value,
      user_name: username.value,
      user_password: password.value,
    };

    if (newUserData) {
      // Appel du service backend pour mettre à jour l'utilisateur via une API
      this.apiservice.updateUser(newUserData, this.userData.user_id).subscribe({
        next: (result) => {
          console.log(result);  // Affichage du résultat de la mise à jour dans la console
          this.apiservice.logout();  // Déconnexion de l'utilisateur via le service backend
          this.router.navigateByUrl('/login');  // Redirection vers la page de connexion après la mise à jour
        },
        error: (err) => {
          // Gestion des erreurs potentielles lors de la mise à jour
        }
      });
    }
  }

  ngOnInit(): void {
    this.getUserData();  // Appel de getUserData lors de l'initialisation du composant
  }
}

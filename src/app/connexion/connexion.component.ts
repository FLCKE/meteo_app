import { Component } from '@angular/core';
import { UserComponent } from '../model/model.user.component';
import { BackendService } from '../back_api/backend.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  public errorMessage!: string; // Variable pour stocker les messages d'erreur
  public user!: UserComponent; // Variable pour stocker les informations de l'utilisateur
  public userAuthentificate!: boolean; // Variable pour indiquer si l'utilisateur est authentifié

  constructor(private apiservice: BackendService, private router: Router) {
    // Constructeur injectant le service BackendService et le Router Angular
  }

  /**
   * Méthode pour gérer la connexion de l'utilisateur
   */
  public login() {
    console.log("Tentative de connexion...");

    // Récupération des valeurs des champs email et password
    let email: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    let password: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    console.log(email.value, password.value);

    // URL de l'API pour la connexion
    let loginUrl = "http://localhost:3306/login" + "?email=" + email.value + "&password=" + password.value;

    // Appel à l'API pour tenter de se connecter avec les informations fournies
    this.apiservice.getUser(loginUrl).subscribe({
      next: (result) => {
        console.log("Connexion réussie, données récupérées");
        this.user = result.data; // Affecter les informations récupérées à l'utilisateur
        this.authentificateUser(); // Authentifier l'utilisateur et enregistrer ses informations dans le storage local

        if (this.userAuthentificate) {
          // Redirection vers la page d'accueil si l'utilisateur est authentifié
          window.location.href = "/acceuil";
          this.router.navigate(["/acceuil"]);
        }
      },
      error: (Error) => {
        console.log(Error);
        this.errorMessage = "Mot de passe ou email incorrect"; // Afficher un message d'erreur en cas d'échec de la connexion
      }
    });
  }

  /**
   * Méthode pour authentifier l'utilisateur et stocker ses informations
   */
  public authentificateUser() {
    this.userAuthentificate = true;
    // Stocker les informations de l'utilisateur dans le localStorage
    localStorage.setItem("AuthUser", JSON.stringify({
      user_id: this.user.user_id,
      user_name: this.user.user_name,
      user_email: this.user.user_email
    }));
  }
}

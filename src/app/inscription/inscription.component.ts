import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../back_api/backend.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  constructor(private apiservice: BackendService, private router: Router) { }

  /**
   * addUser
   * Récupère les données d'inscription de l'utilisateur et appelle le service backend pour ajouter un nouvel utilisateur.
   */
  public addUser() {
    // Récupération des valeurs des champs d'entrée
    let email = document.getElementById('email') as HTMLInputElement;
    let username = document.getElementById('user_name') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;

    // Création d'un objet contenant les données de l'utilisateur
    const newUserData = {
      user_email: email.value,
      user_name: username.value,
      user_password: password.value,
    };

    // Vérification que les données de l'utilisateur sont valides
    if (newUserData.user_email && newUserData.user_name && newUserData.user_password) {
      // Appel au service backend pour ajouter un nouvel utilisateur
      this.apiservice.addUser(newUserData).subscribe({
        next: (result) => {
          // Redirection vers la page de connexion en cas de succès
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          // Affichage des erreurs en cas d'échec
          console.error('Erreur lors de l\'inscription:', err);
        }
      });
    } else {
      // Affichage d'un message d'erreur si les données sont invalides
      console.error('Les données d\'inscription sont invalides.');
    }
  }
}

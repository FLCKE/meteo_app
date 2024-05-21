import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChargerouteGuard {

  constructor(private router: Router) { }

  /**
   * Vérifie si l'utilisateur est connecté.
   * @returns {boolean} true si l'utilisateur est connecté, sinon false.
   */
  private VerifyUserConnect(): boolean {
    if (typeof localStorage != 'undefined') {
      if (localStorage.getItem("AuthUser")) {
        console.log("Utilisateur authentifié. Autoriser l'accès.");
        return true;
      } else {
        console.log("Utilisateur non authentifié. Redirection vers la page de connexion.");
        this.router.navigate(['/login']); // Redirection vers la page de connexion
        return false;
      }
    } else {
      console.log("LocalStorage non disponible. Redirection vers la page de connexion.");
      this.router.navigate(['/login']); // Redirection vers la page de connexion
      return false;
    }
  }

  /**
   * Détermine si la route peut être activée.
   * @param route L'instantané de la route activée.
   * @param state L'état actuel du routeur.
   * @returns {boolean} true si la route peut être activée, sinon false.
   */
  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return this.VerifyUserConnect();
  }
}
